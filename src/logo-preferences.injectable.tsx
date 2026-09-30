import { Div, Input, P, Span } from "@k8slens/element-components";
import { PlainButton } from "@k8slens/input-components";
import { getExtensionPreferencePageInjectableBunch } from "@k8slens/preferences-contracts";
import { useInject } from "@k8slens/use-inject";
import { observer } from "mobx-react";
import packageJson from "../package.json";
import { currentLogoInjectable } from "./current-logo.injectable";
import { LogoImage } from "./logo-image";
import { logoSpec } from "./logo-spec";
import { resetLogoInjectable, uploadLogoInjectable } from "./set-logo.injectable";

const LogoSettings = observer(() => {
  const uploadLogo = useInject(uploadLogoInjectable)();
  const resetLogo = useInject(resetLogoInjectable)();
  const logo = useInject(currentLogoInjectable)().get();

  return (
    <Div $flex={{ direction: "vertical", gap: "m" }}>
      <Span $font={{ size: "l", bold: true }}>Top bar logo</Span>

      <P $color="textMuted">
        Shown in the top bar, after the back and forward arrows, {logoSpec.displayHeight}px high and at most{" "}
        {logoSpec.maxDisplayWidth}px wide. For a sharp result, upload an image {logoSpec.recommendedHeight}px high
        (up to {logoSpec.maxDisplayWidth * 2}px wide) with a transparent background. SVG, PNG, WebP or JPEG, at most{" "}
        {logoSpec.maxBytes / 1024} KB. The top bar is dark in the dark theme, so pick a logo that reads on it.
      </P>

      <Div $flex={{ direction: "horizontal", gap: "m", verticalAlign: "center" }} $padding="s" $backgroundColor="backgroundSecondary">
        <LogoImage />
      </Div>

      <Div $flex={{ direction: "horizontal", gap: "s", verticalAlign: "center" }}>
        <Input
          type="file"
          accept={logoSpec.mimeTypes.join(",")}
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];

            event.currentTarget.value = "";

            if (file) {
              void uploadLogo(file);
            }
          }}
        />

        <PlainButton $disabled={!logo?.isCustom} onClick={() => void resetLogo()}>
          Reset to default
        </PlainButton>
      </Div>
    </Div>
  );
});

export default getExtensionPreferencePageInjectableBunch({
  packageJson,
  blocks: [{ id: "logo", orderNumber: 10, Component: LogoSettings }],
});
