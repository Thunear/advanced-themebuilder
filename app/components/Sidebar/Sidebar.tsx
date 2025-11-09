import cl from "clsx/lite";
import { useEffect, useState } from "react";

import { useThemeStore } from "../../../store";

import {
  Button,
  Heading,
  Paragraph,
  useMediaQuery,
} from "@digdir/designsystemet-react";
import {
  CogIcon,
  PackageIcon,
  PaletteIcon,
  PencilLineIcon,
  PlateIcon,
  RocketIcon,
  RulerIcon,
  SquareGridIcon,
} from "@navikt/aksel-icons";
import { RadiusPane } from "../../panes/RadiusPane/RadiusPane";
import { ColorsPane, FrontPane, ThemesPane } from "../../panes";
import classes from "./Sidebar.module.css";

export const Sidebar = () => {
  const activePane = useThemeStore((state) => state.activePane);
  const setActivePane = useThemeStore((state) => state.setActivePane);

  const [isSticky, setSticky] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 240);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  type CardProps = {
    title: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    blurry?: boolean;
  };

  const Card = ({ title, icon, onClick, blurry }: CardProps) => {
    return (
      <div
        className={cl(classes.card, blurry ? classes.blurry : "")}
        onClick={onClick}
      >
        <div className={classes.icon}>{icon}</div>
        <div>{title}</div>
      </div>
    );
  };

  return (
    <>
      <div>
        <div
          className={cl(
            classes.sidebar,
            isSticky && classes.sticky,
            showSidebar && classes.showSidebar
          )}
        >
          {activePane === "front" && (
            <div>
              <Heading data-size="xs" className={classes.title}>
                Tilpass temaet ditt
              </Heading>

              <Paragraph data-size="sm" className={classes.description}>
                Juster farger og avrunding på elementer (border radius), eller
                velg et forhåndsdefinert tema for å komme raskere i gang. Flere
                tilpasningsmuligheter vil komme etter hvert.
              </Paragraph>

              <div className={classes.cards}>
                <Card
                  onClick={() => setActivePane("colors")}
                  title="Farger"
                  icon={<PaletteIcon title="a11y-title" fontSize="1.5rem" />}
                />
                <Card
                  onClick={() => setActivePane("radius")}
                  title="Border-radius"
                  icon={<PlateIcon title="a11y-title" fontSize="1.5rem" />}
                />
                <Card
                  title="Typografi"
                  icon={<PencilLineIcon title="a11y-title" fontSize="1.5rem" />}
                  blurry
                />
                <Card
                  title="Komponentstørrelser"
                  icon={<PackageIcon title="a11y-title" fontSize="1.5rem" />}
                  blurry
                />
                <Card
                  title="Spacing"
                  icon={<RulerIcon title="a11y-title" fontSize="1.5rem" />}
                  blurry
                />
              </div>
              <Button
                data-color="neutral"
                data-size="sm"
                variant="tertiary"
                onClick={() => setActivePane("themes")}
                className={classes.themesBtn}
              >
                <PackageIcon title="a11y-title" fontSize="1.5rem" />
                Velg et forhåndsdefinert tema
              </Button>
            </div>
          )}
          {activePane === "radius" && <RadiusPane />}
          {activePane === "themes" && <ThemesPane />}
          {activePane.startsWith("colors") && <ColorsPane />}
          {activePane === "front" && (
            <div className={classes.btnGroup}>
              <button
                className={classes.btn}
                onClick={() => {
                  setActivePane("front");
                }}
              >
                <RocketIcon title="a11y-title" fontSize="1.5rem" />
                Ta i bruk tema
              </button>
              <button
                className={cl(classes.btn, classes.secondaryBtn)}
                onClick={() => {
                  setActivePane("front");
                }}
              >
                <CogIcon title="a11y-title" fontSize="1.5rem" />
                Importer config
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
