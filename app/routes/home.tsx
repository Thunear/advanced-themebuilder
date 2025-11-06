import {
  Header,
  TopBar,
  Toolbar,
  Sidebar,
  Colors,
  Footer,
  ColorPreview,
  ColorDetail,
  ColorContrasts,
} from "~/components";
import type { Route } from "./+types/home";
import classes from "./home.module.css";
import clsx from "clsx/lite";
import { useThemeStore } from "store";
import {
  generateColorSchemes,
  getBaseDarkLightness,
  type CssColor,
} from "colors";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Temabygger Prototype" },
    { name: "description", content: "Temabygger Prototype" },
  ];
}

export default function Home() {
  const shrinkSidebar = useThemeStore((state) => state.shrinkSidebar);
  const externalColorScheme = useThemeStore(
    (state) => state.externalColorScheme
  );
  const themeTab = useThemeStore((state) => state.themeTab);
  const colors = useThemeStore((state) => state.colors);
  const onColorThemeChange = useThemeStore((state) => state.onColorThemeChange);
  const updateColorTheme = useThemeStore((state) => state.updateColorTheme);

  useEffect(() => {
    const updatedMainColors = colors.main.map((color) => {
      color.colorMetadata["base-default"].lightness.dark = getBaseDarkLightness(
        color.colors.light[11].hex as CssColor
      );
      const updatedColors = generateColorSchemes(
        color.colors.light[11].hex,
        color.colorMetadata
      );
      return {
        name: color.name,
        colors: updatedColors,
        colorMetadata: color.colorMetadata,
      };
    });

    const updatedNeutralColors = colors.neutral.map((color) => {
      const updatedColors = generateColorSchemes(
        color.colors.light[11].hex,
        color.colorMetadata
      );
      return {
        name: color.name,
        colors: updatedColors,
        colorMetadata: color.colorMetadata,
      };
    });

    const updatedSupportColors = colors.support.map((color) => {
      const updatedColors = generateColorSchemes(
        color.colors.light[11].hex,
        color.colorMetadata
      );
      return {
        name: color.name,
        colors: updatedColors,
        colorMetadata: color.colorMetadata,
      };
    });

    const updatedSeverityColors = colors.severity.map((color) => {
      const updatedColors = generateColorSchemes(
        color.colors.light[11].hex,
        color.colorMetadata
      );
      return {
        name: color.name,
        colors: updatedColors,
        colorMetadata: color.colorMetadata,
      };
    });
    console.log("Updating colors due to theme change...");

    updatedMainColors.forEach((colorTheme, index) => {
      updateColorTheme(colorTheme, index, "main");
    });

    updatedNeutralColors.forEach((colorTheme, index) => {
      updateColorTheme(colorTheme, index, "neutral");
    });

    updatedSupportColors.forEach((colorTheme, index) => {
      updateColorTheme(colorTheme, index, "support");
    });
    updatedSeverityColors.forEach((colorTheme, index) => {
      updateColorTheme(colorTheme, index, "severity");
    });
  }, [onColorThemeChange]);

  return (
    <div data-color-scheme={externalColorScheme} className={classes.app}>
      <TopBar />
      <Header />
      <div className="container">
        <div className={classes.content}>
          <div className={classes.main}>
            <Toolbar />
            {themeTab === "colorsystem" && (
              <>
                <Colors />
                <ColorPreview />
                <ColorDetail />
              </>
            )}
            {themeTab === "contrast" && (
              <>
                <ColorContrasts />
              </>
            )}
          </div>
          <div className={clsx(classes.aside, shrinkSidebar && classes.shrink)}>
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
