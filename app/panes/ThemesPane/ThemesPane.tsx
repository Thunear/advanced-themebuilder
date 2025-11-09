import { Button, Heading } from "@digdir/designsystemet-react";
import classes from "./ThemesPane.module.css";
import { useThemeStore } from "store";
import { ChevronLeftIcon, CogIcon } from "@navikt/aksel-icons";
import cl from "clsx/lite";

export const ThemesPane = () => {
  const activePane = useThemeStore((state) => state.activePane);
  const setActivePane = useThemeStore((state) => state.setActivePane);

  type CardProps = {
    title: string;
    radius: string;
    active?: boolean;
  };

  const Card = ({ title, radius, active }: CardProps) => {
    return (
      <div className={cl(classes.themeCard, active && classes.active)}>
        <div className={classes.themeCardTitle}>{title}</div>
        <div className={classes.themeCardBottom}>
          <div className={classes.themeCardColorsContainer}>
            <div className={classes.themeCardLabel}>Farger</div>
            <div className={classes.themeCardColors}>
              <div className={classes.themeCardColor}></div>
              <div className={classes.themeCardColor}></div>
              <div className={classes.themeCardColor}></div>
              <div className={classes.themeCardColor}></div>
            </div>
          </div>
          <div className={classes.themeCardRadius}>
            <div className={classes.themeCardLabel}>Border-radius</div>
            <div className={classes.themeCardValue}>{radius}</div>
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
        <Card title="Blomstereng" radius="Full" active />
        <Card title="Løvehjerte" radius="Medium" />
        <Card title="Blomstereng" radius="Small" />
      </div>
    </div>
  );
};
