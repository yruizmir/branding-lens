import { getPersistableValueInjectableBunch } from "@k8slens/persistable-contracts";

export interface BrandLogoState {
  // A data URL of the uploaded image, or undefined for the bundled default.
  readonly customLogo: string | undefined;
}

export default getPersistableValueInjectableBunch<BrandLogoState>()({
  id: "brand-logo",
  defaultValue: { instantiate: () => async () => ({ customLogo: undefined }) },
});
