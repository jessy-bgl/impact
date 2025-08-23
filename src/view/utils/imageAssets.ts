// Image assets mapping for cross-platform compatibility
export const ImageAssets = {
  ecology: require("@assets/images/ecology.gif"),
  empty_box: require("@assets/images/empty_box.png"),
  food: require("@assets/images/food.png"),
  goods: require("@assets/images/goods.png"),
  house: require("@assets/images/house.png"),
  intro_actions: require("@assets/images/intro_actions.png"),
  intro_profile: require("@assets/images/intro_profile.png"),
  public_services: require("@assets/images/public_services.png"),
  transport: require("@assets/images/transport.png"),
} as const;

export type ImageAssetKey = keyof typeof ImageAssets;

export const getImageAsset = (key: keyof typeof ImageAssets): string | null => {
  return ImageAssets[key] || null;
};
