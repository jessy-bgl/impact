import { act, renderHook } from "@testing-library/react-native";

import { SocietalServicesFootprint } from "@carbonFootprint/domain/entities/footprints/SocietalServicesFootprint";
import { defaultAppStore } from "@common/store/store";
import { zustandAppStore } from "@common/store/store.zustand";

import { useSocietalServicesFootprints } from "./useSocietalServicesFootprints";

const setSocietalServicesFootprint = async (
  societalServices: SocietalServicesFootprint,
) => {
  const stored = zustandAppStore.getState();
  await act(async () => {
    zustandAppStore.setState({
      footprints: { ...stored.footprints, societalServices },
    });
  });
};

describe("useSocietalServicesFootprints", () => {
  afterEach(async () => {
    await act(async () => {
      zustandAppStore.setState(defaultAppStore());
    });
  });

  it("splits the stored footprint into a total and parts adding up to 100", async () => {
    await setSocietalServicesFootprint(
      new SocietalServicesFootprint({
        publicServicesFootprint: 1000,
        merchantServicesFootprint: 2000,
      }),
    );

    const { result } = await renderHook(() => useSocietalServicesFootprints());
    const { publicServices, merchantServices, totalFootprint, isLoading } =
      result.current;

    expect(publicServices.footprint).toBe(1000);
    expect(merchantServices.footprint).toBe(2000);
    expect(totalFootprint).toBe(3000);
    expect(publicServices.part + merchantServices.part).toBe(100);
    expect(isLoading).toBe(false);
  });

  it("styles each half with its own palette key", async () => {
    const { result } = await renderHook(() => useSocietalServicesFootprints());

    expect(result.current.publicServices.styleKey).toBe("societalServices");
    expect(result.current.merchantServices.styleKey).toBe("merchantServices");
  });

  it("leaves both parts at 0 when the footprint is 0", async () => {
    await setSocietalServicesFootprint(new SocietalServicesFootprint({}));

    const { result } = await renderHook(() => useSocietalServicesFootprints());

    expect(result.current.publicServices.part).toBe(0);
    expect(result.current.merchantServices.part).toBe(0);
  });
});
