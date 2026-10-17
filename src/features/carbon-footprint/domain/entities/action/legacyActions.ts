import { DottedName } from "@incubateur-ademe/nosgestesclimat";

/**
 * Actions removed in nosgestesclimat 4.14.4 whose replacement is a direct
 * equivalent: the state the user gave them carries over.
 */
export const legacyActionIds: Partial<Record<DottedName, string>> = {
  "actions . alimentation . valoriser ses déchets":
    "alimentation . déchets . composter",
  "actions . logement . isoler":
    "logement . chauffage . rénovation énergétique",
  "actions . logement . installer thermostat programmable":
    "logement . chauffage . installer thermostat",
  "actions . logement . installer panneaux solaires thermiques":
    "logement . chauffage . chauffe eau solaire . installer chauffe eau solaire",
  "actions . logement . logement frais sans clim":
    "logement . climatisation . réduction",
  "actions . logement . installer panneaux solaires photovoltaïques":
    "logement . installer photovoltaique",
  "actions . logement . offre énergies renouvelables":
    "logement . électricité verte",
  "actions . mobilités . limiter avion court courrier":
    "transport . avion . arrêter l'avion court",
  "actions . mobilités . écoconduite": "transport . voiture . éco-conduite",
  "actions . mobilités . location voiture": "transport . voiture . autopartage",
  "actions . mobilités . petits trajets sans voiture":
    "transport . voiture . voiture 5km",
  "actions . mobilités . voiture électrique":
    "transport . voiture . voiture électrique",
  "actions . mobilités . réduire vitesse autoroute":
    "transport . voiture . limitation autoroute",
  "actions . mobilités . covoiturage quotidien":
    "transport . voiture . boulot . faire du covoiturage",
  "actions . consommation . achat seconde main":
    "divers . textile . réduire neuf . privilégier la seconde main",
  "actions . vie quotidienne . finance durable":
    "services sociétaux . bien placer argent",
};
