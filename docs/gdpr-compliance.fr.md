# Conformité RGPD / CNIL — intégration PostHog

**Responsable de traitement :** Jessy Tony Bogalho, personne physique — `impactech@proton.me`
**Sous-traitant :** PostHog, Inc. — région EU Cloud (Francfort)
**Droit applicable :** RGPD (UE 2016/679) + Loi n° 78-17 Informatique et Libertés + doctrine CNIL
**Dernière mise à jour :** 2026-07-28

Ce document décrit l'état de conformité de l'application et les raisons des choix faits. Ce
n'est pas un avis juridique. Il sert de référence pour toute modification future touchant à
PostHog, au consentement ou aux données personnelles.

---

## 1. Base légale : le consentement

Les données envoyées à PostHog sont des données personnelles : le `distinct_id` est un
identifiant persistant qui singularise un appareil (art. 4(1) RGPD, considérants 26 et 30), et
les propriétés d'appareil collectées automatiquement (modèle, OS, locale, fuseau, dimensions
d'écran) constituent un second vecteur d'identification.

**L'art. 82 LIL** impose un consentement préalable à toute écriture sur le terminal de
l'utilisateur — dont l'écriture du `distinct_id`. L'analytics n'est pas strictement nécessaire
au calcul d'une empreinte carbone.

**L'exemption CNIL « mesure d'audience » ne s'applique pas** : le suivi d'erreurs avec traces
d'exécution est une finalité distincte de la mesure d'audience, et ce point n'est pas
corrigeable par configuration. Le consentement reste donc obligatoire même après la
minimisation décrite en §3.

Base légale retenue : **art. 6(1)(a) RGPD** (consentement), **art. 82 LIL** pour le stockage
terminal.

---

## 2. Le portail de consentement

Implémenté dans `src/features/consent/`, selon l'architecture Clean du projet.

- État `analyticsConsent { state, decidedAt, policyVersion }` dans le store Zustand persisté.
  `decidedAt` et `policyVersion` constituent la preuve locale du consentement (art. 7(1)).
- `src/app/App.tsx` applique une porte à trois branches : `unset` → `ConsentScreen` seul ;
  `granted` → `PostHogProvider` + `PostHogErrorBoundary` ; `denied` → navigateur nu, sans
  aucun wrapper PostHog.
- `grantAnalyticsConsent` écrit l'état puis appelle `posthog.optIn()`.
  `revokeAnalyticsConsent` écrit l'état puis `posthog.optOut()` **et** `posthog.reset()` —
  `reset()` jette le `distinct_id`, donc un nouveau consentement crée un identifiant neuf au
  lieu de reprendre l'ancien profil.
- Refuser est aussi simple qu'accepter : même écran, même poids visuel, aucune case
  pré-cochée. Le refus n'est jamais re-demandé aux lancements suivants.
- Retrait à tout moment via `AnalyticsConsentToggle`, présent dans le menu **Paramètres** et
  sur l'écran **Mes données**. Effet immédiat, sans redémarrage.

### 2.1 Piège du SDK — à ne pas défaire

`capture()` (et donc `screen()` et `autocapture()`) appelle `getDistinctId()` **avant** le
contrôle `optedOut` dans `enqueue()`. Or `getDistinctId()` **génère et persiste** un UUID
anonyme au premier appel. Conséquence : `defaultOptIn: false` empêche l'**envoi** des
événements, mais n'empêche pas l'**écriture** de l'identifiant dès qu'un chemin de capture
s'exécute.

Trois protections en découlent, chacune load-bearing :

1. `captureAppLifecycleEvents: false` — déclenchait un `capture()` automatique à
   l'initialisation du client, avant même que le consentement puisse être connu.
2. `preloadFeatureFlags: false` — déclenchait une requête de flags nécessitant un
   `distinct_id` à l'init (et l'app n'utilise aucun feature flag).
3. `PostHogProvider` n'est monté **que** si le consentement est `granted`. Sinon, taper les
   boutons Accepter/Refuser de l'écran de consentement déclencherait `autocapture()`, et donc
   écrirait un identifiant depuis le geste censé accorder ou refuser le consentement.

`DataPolicy.tsx` n'appelle `posthog.getDistinctId()` que si l'état est `granted`, pour la même
raison : l'appeler autrement créerait l'identifiant que la porte existe pour empêcher.

Cas résiduel accepté : `errorTracking.autocapture` est câblé au niveau SDK et écrirait un
identifiant local si un crash survenait pendant l'état `unset`. Rien ne serait transmis
(`defaultOptIn: false`, rien n'est mis en file tant qu'`optedOut`). Jugé peu probable et non
transmissif ; désactiver le suivi de crash avant consentement a été écarté.

---

## 3. Minimisation (art. 5(1)(c))

### Dans `src/common/config/posthog.ts`

```ts
defaultOptIn: false,             // aucun envoi tant que le consentement n'est pas accordé
disableGeoip: true,              // pas d'enrichissement $geoip_* (ville, lat/long)
personProfiles: "never",         // pas de profils serveur ; il n'y a pas de comptes
enableSessionReplay: false,      // explicite : le replay est activable à distance depuis PostHog
captureAppLifecycleEvents: false, // voir §2.1
preloadFeatureFlags: false,      // voir §2.1
sendFeatureFlagEvent: false,
```

### Dans `src/app/App.tsx`

`captureScreens: false` et `captureTouches: false`. Les événements nommés couvrent déjà les
parcours utiles ; `$el_text` et les coordonnées de touche ajoutaient un risque de fuite pour
une valeur analytique marginale.

### Suivi d'erreurs

- Filtre `before_send` dans `posthog.ts` : tronque `value` de chaque `$exception_list` à 200
  caractères. Filet de sécurité pour les sources d'exceptions non anticipées (crashs natifs,
  rejets non gérés).
- Sites de `catch` assainis à la source : `AdemeEngine.ts` (`getSituation`, `setSituation`,
  `evaluate`) et `useProfileSync.ts` envoient des messages statiques
  (`"ademe_engine_get_situation_failed"`, etc.) au lieu de l'erreur brute. Un message d'erreur
  Publicodes peut contenir les valeurs sur lesquelles il a échoué — chauffage, régime
  alimentaire, véhicule.

### Frontière absolue

**Les valeurs des réponses du questionnaire ne doivent jamais être envoyées comme propriétés
d'événement.** Les réponses sur l'alimentation ou le logement permettent des inférences sur la
religion ou la santé — catégories particulières de l'art. 9, exigeant un consentement explicite
et un niveau de conformité bien supérieur. Les noms de catégorie et sous-catégorie sont
autorisés ; les valeurs ne le sont pas. Règle inscrite dans `AGENTS.md`.

---

## 4. Ce qui est collecté

**Avec consentement uniquement :**

- Analytics produit : identifiant aléatoire, écrans visités, événements nommés (catégorie
  ouverte, section complétée, action démarrée/ignorée, thème changé, lien externe ouvert…),
  modèle d'appareil, version d'OS, version d'app, langue, fuseau horaire.
- Diagnostics d'erreur : type d'exception, message tronqué, trace d'exécution.

**Jamais collecté :** les valeurs des réponses au questionnaire, la géolocalisation précise
(aucune API de localisation n'est utilisée), les profils serveur, le session replay, toute
donnée de compte — il n'y a ni compte ni `identify()`.

**Conservation :**

| Donnée                     | Durée                                                                       |
| -------------------------- | --------------------------------------------------------------------------- |
| Événements analytics       | 1 an                                                                        |
| Événements `$exception`    | 90 jours                                                                    |
| Identifiant sur l'appareil | jusqu'à désinstallation, effacement des données, ou retrait du consentement |

1 an est le minimum permis par le plan PostHog actuel, et reste largement dans les repères
CNIL (13 mois de durée de vie du traceur, 25 mois de conservation).

**L'identifiant n'est pas renouvelé périodiquement** et aucune rotation n'est implémentée. Le
repère CNIL de 13 mois vise les traceurs _exemptés_ de consentement, ce qui n'est pas le cas
ici. C'est défendable, mais seulement si c'est déclaré : la politique de confidentialité doit
énoncer la durée réelle et ne jamais laisser entendre un renouvellement qui n'existe pas.

---

## 5. Droits des personnes (art. 15-17, 12)

Il n'y a pas de compte, donc pas de recherche par email. Le `distinct_id` sert de poignée.

- **Affichage de l'identifiant** sur l'écran **Paramètres → Mes données** : 8 premiers
  caractères plus un bouton de copie (`expo-clipboard`).
- **Effacement local en libre-service** : bouton « Effacer mes données locales » sur le même
  écran, derrière une confirmation, câblé à `clearLocalData`
  (`src/features/data-management/`). Efface réponses, émissions calculées et actions
  enregistrées. Ne touche pas aux événements déjà envoyés à PostHog.
- **`analyticsConsent` est délibérément exclu de cet effacement**.
  Le remettre à `"unset"` désynchroniserait le store du SDK : le store dirait « aucun choix fait »
  et `App.tsx` ré-afficherait `ConsentScreen`, pendant que le client PostHog resterait opté **in** —
  `errorTracking.autocapture` pourrait donc transmettre un `$exception` pendant l'écran de consentement.
  Le consentement est une décision permanente vis-à-vis d'un tiers, pas une donnée applicative.
  Test de non-régression : `appData.store.repository.test.ts`.
- **Accès, export, effacement côté serveur** : par email à `impactech@proton.me` en joignant
  l'identifiant. Réponse sous un mois (art. 12(3)).
- **Limite honnête, énoncée dans la politique** : après retrait du consentement ou effacement
  du stockage, l'identifiant — et la capacité à rattacher une demande à des données — est
  perdu. Ce n'est pas contournable.
- **Réclamation CNIL** : lien vers `cnil.fr/fr/plaintes` dans la politique.

---

## 6. Sous-traitance et transferts (art. 28, 44-49)

DPA signé le 2026-07-27 via `app.posthog.com/legal`, conservé **hors de ce dépôt** (le dépôt
est public et le document porte l'adresse postale du responsable) ; son emplacement est noté
dans le registre.

Processeur : **PostHog, Inc.**, 2261 Market St #4008, San Francisco, CA 94114, USA. Le DPA
**incorpore les clauses contractuelles types**. Projet en région EU, données stockées à
Francfort.

Sous-traitants ultérieurs (`posthog.com/subprocessors`) :

| Sous-traitant             | Finalité                                     | Localisation            |
| ------------------------- | -------------------------------------------- | ----------------------- |
| Amazon Web Services, Inc. | Stockage cloud des données PostHog Cloud     | USA ou Allemagne        |
| Wiz, Inc.                 | Gestion des vulnérabilités                   | Allemagne, France       |
| PlanetScale, Inc.         | Opérations et supervision de base de données | USA ou Allemagne        |
| Modal Labs, Inc.          | Calcul serverless isolé                      | USA ou Allemagne        |
| Cloudflare, Inc.          | Reverse proxy, edge, CDN, routage            | Edge mondial, dynamique |

**L'hébergement EU ne supprime pas le transfert hors UE.** PostHog Inc. est une société
américaine et Cloudflare route par des points de présence mondiaux. Le transfert est réel ; ce
sont les CCT du DPA qui le couvrent. La politique de confidentialité le dit en ces termes,
sans prétendre que « les données ne quittent jamais l'UE ».

---

## 7. Choix documentés

**Responsable : personne physique.** Aucune entité juridique interposée. Le nom légal complet
est utilisé partout (politique, registre, DPA) et correspond au nom de développeur affiché sur
le Play Store. L'exemption « activité personnelle ou domestique » (art. 2(2)(c)) ne s'applique
pas : l'application est distribuée publiquement.

**Aucun DPO désigné.** L'art. 37(1) le rend obligatoire dans trois cas seulement : autorité
publique (non) ; suivi à grande échelle, régulier et systématique (régulier et systématique
oui, mais pas « à grande échelle » pour une app de cette taille) ; traitement à grande échelle
de données de l'art. 9 (non, tant que §3 tient). `impactech@proton.me` est le point de contact
vie privée, ce qu'exige effectivement l'art. 13.

**Aucune donnée préexistante à remédier.** PostHog n'a jamais été livré avant cette
intégration. L'instance Plausible antérieure (janvier 2024 – avril 2024) était auto-hébergée —
donc sans sous-traitant tiers ni transfert — et l'instance comme ses données ont été purgées.
La démarche est préventive, pas corrective ; le registre le mentionne.

**Le token PostHog n'est pas un secret.** `POSTHOG_PROJECT_TOKEN` est un token public en
écriture seule, embarqué dans chaque binaire par conception ; sa divulgation n'est pas un
incident de sécurité. En revanche les clés d'API personnelles (upload de sourcemaps par
`@posthog/cli`) restent en secrets CI uniquement.

---

## 8. Documents liés

- Politique de confidentialité : `docs/privacy-policy/privacy_policy.md` et son jumeau
  `.html` (c'est le `.html` qui est publié et vers lequel pointe `DataPolicy.tsx`). **Les deux
  doivent rester synchronisés**, et toute modification du texte se relit contre `posthog.ts`
  et `DataPolicy.tsx` avant publication. Texte et code sont livrés dans la **même** release.
- Registre des traitements (art. 30), screening AIPD (art. 35), procédure de violation
  (art. 33/34), copie signée du DPA : conservés hors dépôt, en stockage privé.

---

## Références

- RGPD (UE 2016/679) — art. 4, 5, 6, 7, 12-14, 28, 30, 32-35, 37, 44-49 ; considérants 26, 30
- Loi n° 78-17 du 6 janvier 1978 (Informatique et Libertés) — art. 45, 82
- [CNIL — cookies et autres traceurs](https://www.cnil.fr/fr/cookies-et-autres-traceurs)
- [CNIL — exemption mesure d'audience](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience) — repères 13 mois / 25 mois
- CJUE C-582/14 (_Breyer_) — l'adresse IP est une donnée personnelle
- [PostHog — guide de conformité RGPD](https://posthog.com/docs/privacy/gdpr-compliance)
- [PostHog — suppression de données](https://posthog.com/docs/privacy/data-deletion)
- [PostHog — sous-traitants](https://posthog.com/subprocessors)
- [PostHog DPA](https://posthog.com/dpa) — informatif ; la copie contraignante se génère dans l'app
