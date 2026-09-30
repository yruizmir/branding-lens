import { useInject } from "@k8slens/use-inject";
import { observer } from "mobx-react";
import { currentLogoInjectable } from "./current-logo.injectable";
import { logoSpec } from "./logo-spec";

export const LogoImage = observer(() => {
  const logo = useInject(currentLogoInjectable)().get();

  if (!logo) {
    return null;
  }

  return (
    <img
      src={logo.src}
      alt="Brand logo"
      style={{
        height: logoSpec.displayHeight,
        maxWidth: logoSpec.maxDisplayWidth,
        objectFit: "contain",
        display: "block",
      }}
    />
  );
});
