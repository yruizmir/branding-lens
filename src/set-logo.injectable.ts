import { getInjectable2 } from "@k8slens/injectable";
import {
  showErrorNotificationInjectionToken,
  showSuccessNotificationInjectionToken,
} from "@k8slens/notifications-contracts";
import brandLogoState from "./brand-logo-state.injectable";
import { logoSpec } from "./logo-spec";

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

export const uploadLogoInjectable = getInjectable2({
  id: "branding-lens-upload-logo",
  consumptions: [showErrorNotificationInjectionToken, showSuccessNotificationInjectionToken],
  instantiate: (di) => {
    const getState = di.inject(brandLogoState.persistable);
    const showError = di.inject(showErrorNotificationInjectionToken)();
    const showSuccess = di.inject(showSuccessNotificationInjectionToken)();

    return () => async (file: File) => {
      if (!(logoSpec.mimeTypes as readonly string[]).includes(file.type)) {
        showError("The logo must be an SVG, PNG, WebP or JPEG image.");

        return;
      }

      if (file.size > logoSpec.maxBytes) {
        showError(`The logo must be at most ${logoSpec.maxBytes / 1024} KB; this one is ${Math.ceil(file.size / 1024)} KB.`);

        return;
      }

      const state = await getState();

      state.set({ customLogo: await readAsDataUrl(file) });
      showSuccess("Logo updated.");
    };
  },
});

export const resetLogoInjectable = getInjectable2({
  id: "branding-lens-reset-logo",
  instantiate: (di) => {
    const getState = di.inject(brandLogoState.persistable);

    return () => async () => {
      const state = await getState();

      state.set({ customLogo: undefined });
    };
  },
});
