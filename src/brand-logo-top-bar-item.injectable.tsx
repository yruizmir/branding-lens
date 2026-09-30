import { getTopBarItemInjectableBunch } from "@k8slens/top-bar-contracts";
import { LogoImage } from "./logo-image";

const BrandLogoTopBarItem = () => (
  <div style={{ display: "flex", alignItems: "center", padding: "0 8px" }}>
    <LogoImage />
  </div>
);

export default getTopBarItemInjectableBunch({
  id: "branding-lens-brand-logo-top-bar-item",
  side: "left",
  // High number so it lands after Lens's back/forward arrows.
  orderNumber: 1000,
  Component: BrandLogoTopBarItem,
});
