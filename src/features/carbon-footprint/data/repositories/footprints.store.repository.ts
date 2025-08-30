import { EverydayThingsFootprint } from "@carbonFootprint/domain/entities/footprints/EverydayThingsFootprint";
import { FoodFootprint } from "@carbonFootprint/domain/entities/footprints/FoodFootprint";
import { HousingFootprint } from "@carbonFootprint/domain/entities/footprints/HousingFootprint";
import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { TransportFootprint } from "@carbonFootprint/domain/entities/footprints/TransportFootprint";
import { FootprintsRepository } from "@carbonFootprint/domain/repositories/footprints.repository";
import { useAppStore } from "@common/store/useStore";

export class FootprintsStoreRepository implements FootprintsRepository {
  constructor(private store: typeof useAppStore) {}

  updateTransportFootprint(footprint: TransportFootprint) {
    this.store.setState((state) => ({
      ...state,
      footprints: { ...state.footprints, transport: footprint },
    }));
  }

  updateFoodFootprint(footprint: FoodFootprint) {
    this.store.setState((state) => ({
      ...state,
      footprints: { ...state.footprints, food: footprint },
    }));
  }

  updateHousingFootprint(footprint: HousingFootprint) {
    this.store.setState((state) => ({
      ...state,
      footprints: { ...state.footprints, housing: footprint },
    }));
  }

  updateEverydayThingsFootprint(footprint: EverydayThingsFootprint) {
    this.store.setState((state) => ({
      ...state,
      footprints: { ...state.footprints, everydayThings: footprint },
    }));
  }

  updateSocietalServicesFootprint(footprint: SocietalServicesFootprint) {
    this.store.setState((state) => ({
      ...state,
      footprints: { ...state.footprints, societalServices: footprint },
    }));
  }
}
