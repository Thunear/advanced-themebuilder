import { Button, ToggleGroup, Tooltip } from "@digdir/designsystemet-react";
import classes from "./Toolbar.module.css";
import {
  ChevronRightLastIcon,
  GlassesIcon,
  PackageIcon,
  PaletteIcon,
  PencilLineIcon,
} from "@navikt/aksel-icons";
import { useThemeStore } from "store";
import cl from "clsx/lite";
import { ColorSchemeSwitch } from "../ColorSchemeSwitch/ColorSchemeSwitch";

export function Toolbar() {
  const setShrinkSidebar = useThemeStore((state) => state.setShrinkSidebar);
  const shrinkSidebar = useThemeStore((state) => state.shrinkSidebar);
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );
  const setInternalColorScheme = useThemeStore(
    (state) => state.setInternalColorScheme
  );

  const themeTab = useThemeStore((state) => state.themeTab);
  const setThemeTab = useThemeStore((state) => state.setThemeTab);

  const tabs: {
    name: string;
    value: "overview" | "colorsystem" | "contrast" | "typography" | "radius";
  }[] = [
    { name: "Fargeoversikt", value: "colorsystem" },
    { name: "Kontraster", value: "contrast" },
    { name: "Designeksempler", value: "overview" },
  ];

  return (
    <div className={classes.toolbar}>
      <div className={classes.left}>
        <div data-size="md" className={classes.tabs}>
          {tabs.map((tab, i) => (
            <button
              key={tab.value}
              data-size="sm"
              className={cl(
                classes.tab,
                classes[`tab-${i}`], // Unique class based on index
                "ds-focus-visible"
              )}
              onClick={() => setThemeTab(tab.value)}
              data-active={themeTab === tab.value}
            >
              <div className={classes.icon}>
                {i === 0 && <PaletteIcon title="a11y-title" fontSize="1rem" />}
                {i === 1 && (
                  <GlassesIcon title="a11y-title" fontSize="1.6rem" />
                )}
                {i === 2 && (
                  <PencilLineIcon title="a11y-title" fontSize="1.6rem" />
                )}
                {i === 3 && (
                  <PackageIcon title="a11y-title" fontSize="1.6rem" />
                )}
              </div>
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      <div className={classes.right}>
        <ColorSchemeSwitch />
      </div>
    </div>
  );
}
