import { getInjectable2 } from "@k8slens/injectable";
import { statusBarItemInjectionToken } from "@k8slens/status-bar-contracts";

export const placeholderStatusBarItemInjectable = getInjectable2({
  id: "brainding-lens-placeholder-status-bar-item",
  instantiate: () => () => ({
    Component: () => <span>Hello World: brainding-lens</span>,
    position: "right" as const,
    orderNumber: 90,
  }),
  injectionToken: statusBarItemInjectionToken,
});
