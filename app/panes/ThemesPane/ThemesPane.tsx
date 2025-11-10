import { Button, Heading } from "@digdir/designsystemet-react";
import classes from "./ThemesPane.module.css";
import { useThemeStore } from "store";
import { ChevronLeftIcon, CogIcon } from "@navikt/aksel-icons";
import cl from "clsx/lite";
import { themes } from "../../../colors/themes";

export const ThemesPane = () => {
  const activePane = useThemeStore((state) => state.activePane);
  const setActivePane = useThemeStore((state) => state.setActivePane);
  const setColors = useThemeStore((state) => state.setColors);
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const setActiveTheme = useThemeStore((state) => state.setActiveTheme);
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );

  type CardProps = {
    title: string;
    borderRadius: {
      name: string;
      value: number;
    };
    active?: boolean;
    colors: {
      main: { name: string; colors: any; colorMetadata: any }[];
      neutral: { name: string; colors: any; colorMetadata: any }[];
      support: { name: string; colors: any; colorMetadata: any }[];
      severity: { name: string; colors: any; colorMetadata: any }[];
    };
    onClick?: () => void;
  };

  const Card = ({
    title,
    borderRadius,
    active,
    colors,
    onClick,
  }: CardProps) => {
    return (
      <div
        className={cl(classes.themeCard, active && classes.themeCardActive)}
        onClick={onClick}
      >
        <div className={classes.themeCardTitle}>{title}</div>
        <div className={classes.themeCardBottom}>
          <div className={classes.themeCardColorsContainer}>
            <div className={classes.themeCardLabel}>Farger</div>
            <div className={classes.themeCardColors}>
              {colors.main.map((color, index) => (
                <div
                  key={index}
                  className={classes.themeCardColor}
                  style={{
                    backgroundColor: color.colors[internalColorScheme][11].hex,
                  }}
                ></div>
              ))}
              {colors.neutral.map((color, index) => (
                <div
                  key={index}
                  className={classes.themeCardColor}
                  style={{
                    backgroundColor: color.colors[internalColorScheme][11].hex,
                  }}
                ></div>
              ))}
              {colors.support.map((color, index) => (
                <div
                  key={index}
                  className={classes.themeCardColor}
                  style={{
                    backgroundColor: color.colors[internalColorScheme][11].hex,
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className={classes.themeCardRadius}>
            <div className={classes.themeCardLabel}>Border-radius</div>
            <div className={classes.themeCardValue}>{borderRadius.name}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={classes.header}>
        <Button
          data-size="sm"
          variant="tertiary"
          onClick={() => {
            setActivePane("front");
          }}
          className={classes.back}
        >
          <ChevronLeftIcon aria-hidden fontSize="1.5rem" /> Meny
        </Button>
      </div>
      <Heading data-size="xs" className={classes.title}>
        Velg et forhåndsdefinert tema
      </Heading>

      <div className={classes.cards}>
        {Object.keys(themes).map((themeKey) => {
          const theme = themes[themeKey as keyof typeof themes];
          return (
            <Card
              colors={theme.colors}
              key={theme.name}
              title={theme.name}
              borderRadius={theme.borderRadius}
              active={activeTheme === themeKey}
              onClick={() => {
                setColors(theme.colors);
                setActiveTheme(themeKey);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
