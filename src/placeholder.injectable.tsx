import { getInjectable2 } from "@k8slens/injectable";
import { statusBarItemInjectionToken } from "@k8slens/status-bar-contracts";

export const placeholderStatusBarItemInjectable = getInjectable2({
  id: "branding-lens-placeholder-status-bar-item",
  instantiate: () => () => ({
    Component: () => <span>Hello World: branding-lens</span>,
    position: "right" as const,
    orderNumber: 90,
  }),
  injectionToken: statusBarItemInjectionToken,
});
