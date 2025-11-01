import { RovingFocusRoot } from "@digdir/designsystemet-react";
import type { ThemeInfo } from "../../../colors";
import { ColorGroup } from "../ColorGroup/ColorGroup";
import clsx from "clsx/lite";

import classes from "./ColorRow.module.css";
import { useThemeStore } from "store";

type ScaleProps = {
  colorScale: ThemeInfo;
  showHeader?: boolean;
  showColorMeta?: boolean;
  namespace: string;
  showScale?: boolean;
};

export const ColorRow = ({
  colorScale,
  showHeader,
  showColorMeta,
  namespace,
}: ScaleProps) => {
  const activeColorTheme = useThemeStore((state) => state.activeColorTheme);
  const activePane = useThemeStore((state) => state.activePane);

  return (
    <div
      className={clsx(
        classes.themes,
        activeColorTheme.colorTheme.name === namespace &&
          activePane.startsWith("colors/") &&
          classes.active
      )}
    >
      <RovingFocusRoot activeValue={namespace + "1"} asChild>
        <div className={classes.test}>
          <ColorGroup
            header={showHeader ? "Background" : ""}
            colorNames={["background-default", "background-tinted"]}
            colorScale={colorScale}
            showColorMeta={showColorMeta}
            names={["Default", "Tinted"]}
            namespace={namespace}
          />
          <ColorGroup
            header={showHeader ? "Surface" : ""}
            colorNames={[
              "surface-default",
              "surface-tinted",
              "surface-hover",
              "surface-active",
            ]}
            colorScale={colorScale}
            showColorMeta={showColorMeta}
            names={["Default", "Tinted", "Hover", "Active"]}
            namespace={namespace}
          />
          <ColorGroup
            showColorMeta={showColorMeta}
            header={showHeader ? "Border" : ""}
            colorNames={["border-subtle", "border-default", "border-strong"]}
            colorScale={colorScale}
            names={["Subtle", "Default", "Strong"]}
            namespace={namespace}
          />
          <ColorGroup
            showColorMeta={showColorMeta}
            header={showHeader ? "Text" : ""}
            colorNames={["text-subtle", "text-default"]}
            colorScale={colorScale}
            names={["Subtle", "Default"]}
            namespace={namespace}
          />
          <ColorGroup
            showColorMeta={showColorMeta}
            header={showHeader ? "Base" : ""}
            colorNames={[
              "base-default",
              "base-hover",
              "base-active",
              "base-contrast-subtle",
              "base-contrast-default",
            ]}
            colorScale={colorScale}
            names={[
              "Default",
              "Hover",
              "Active",
              "Contrast Subtle",
              "Contrast Default",
            ]}
            namespace={namespace}
          />
        </div>
      </RovingFocusRoot>
    </div>
  );
};
