---
name: changelog
description: Génère une note de version en français pour Google Play et l'App Store à partir des commits depuis le dernier tag git. Utiliser quand l'utilisateur demande une note de version, des release notes, un changelog store ou "quoi de neuf".
argument-hint: "[tag de départ optionnel]"
allowed-tools: Bash(git describe:*), Bash(git log:*), Bash(git tag:*), Bash(git show:*)
---

# Note de version pour les stores

## Contexte

- Dernier tag : !`git describe --tags --abbrev=0`
- Commits depuis le dernier tag :

!`git log $(git describe --tags --abbrev=0)..HEAD --no-merges --pretty=format:'- %s%n%b'`

Si `$ARGUMENTS` contient un tag, utiliser `git log $ARGUMENTS..HEAD --no-merges --pretty=format:'- %s%n%b'` à la place des commits ci-dessus.

## Étapes

1. **Trier les commits** (format conventional commits) :
   - Garder : `feat` (nouveautés), `fix` (corrections), `perf` (performances).
   - Ignorer : `refactor`, `test`, `chore`, `ci`, `build`, `docs`, `style`, et tout ce qui est invisible pour l'utilisateur.
   - Si un commit est ambigu, lire son diff avec `git show --stat <sha>` pour comprendre l'effet visible.
2. **Regrouper** les commits qui touchent la même fonctionnalité en une seule phrase.
3. **Traduire en langage grand public** :
   - Décrire le bénéfice pour l'utilisateur, pas l'implémentation (« Vos réponses par défaut sont désormais enregistrées » plutôt que « save default values on submit »).
   - Aucun jargon technique : pas de noms de composants, de librairies, de « modal », « store », « select », « refactor », « bug de parsing »…
   - Les noms propres comme ADEME peuvent rester s'ils sont parlants.
   - Ton positif, vouvoiement, phrases courtes.
4. **Rédiger** la note :
   - Une phrase d'accroche optionnelle courte.
   - Une liste à puces avec `•` (rendu identique sur les deux stores, pas de Markdown).
   - Nouveautés d'abord, puis améliorations, puis « Corrections de bugs mineurs » si seuls des petits fix restent.
   - **500 caractères maximum, espaces et retours à la ligne compris.**
5. **Vérifier la longueur** en comptant les caractères de la note finale :
   ```bash
   printf '%s' "<note>" | wc -m
   ```
   Si elle dépasse 500, fusionner ou retirer les points les moins importants, puis recompter.
6. **S'il n'y a aucun commit visible pour l'utilisateur**, proposer : « Améliorations de performance et corrections de bugs mineurs. »

## Format de sortie

Afficher :

1. Le tag de départ et le nombre de commits retenus / ignorés (une ligne).
2. La note dans un bloc de code texte prêt à copier-coller.
3. Le nombre de caractères (`xxx / 500`).

Ne pas créer de fichier ni de tag, ne rien commiter.
