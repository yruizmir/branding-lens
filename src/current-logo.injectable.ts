import { getInjectable2 } from "@k8slens/injectable";
import { computed, type IObservableValue, observable, runInAction } from "mobx";
import brandLogoState, { type BrandLogoState } from "./brand-logo-state.injectable";
import { defaultLogo } from "./default-logo";

// The logo to show right now: the uploaded one, or the default. Undefined until the persisted
// state has been read, so nothing flashes the default before a custom logo appears.
export const currentLogoInjectable = getInjectable2({
  id: "brainding-lens-current-logo",
  instantiate: (di) => {
    const getState = di.inject(brandLogoState.persistable);
    const state = observable.box<IObservableValue<BrandLogoState> | undefined>(undefined, { deep: false });

    void getState().then((loaded) => runInAction(() => state.set(loaded)));

    const logo = computed(() => {
      const customLogo = state.get()?.get().customLogo;

      return state.get() && { src: customLogo ?? defaultLogo, isCustom: customLogo !== undefined };
    });

    return () => logo;
  },
});
