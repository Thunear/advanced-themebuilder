import { Button, Heading, Paragraph } from "@digdir/designsystemet-react";
import {
  PackageIcon,
  PaletteIcon,
  PencilLineIcon,
  PlateIcon,
  RulerIcon,
} from "@navikt/aksel-icons";
import cl from "clsx/lite";
import { useThemeStore } from "../../../store";
import classes from "./FrontPane.module.css";

export const FrontPane = () => {
  const activePane = useThemeStore((state) => state.activePane);
  const setActivePane = useThemeStore((state) => state.setActivePane);

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
    <div>
      <Heading data-size="xs" className={classes.title}>
        Konfigurer temaet ditt
      </Heading>

      <Paragraph data-size="sm" className={classes.description}>
        Her feel he rattling display either a pointing he much field up built
        knowing the remain felt.
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
      <div>
        <Button data-size="sm">Velg mellom predefinerte temaer</Button>
      </div>
    </div>
  );
};
