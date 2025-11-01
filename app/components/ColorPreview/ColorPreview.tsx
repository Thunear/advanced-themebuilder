import {
  Button,
  Checkbox,
  Heading,
  Paragraph,
  Switch,
  ToggleGroup,
} from "@digdir/designsystemet-react";
import cl from "clsx/lite";
import { useEffect, useState } from "react";
import { type ColorTheme, useThemeStore } from "../../../store";
import { generateColorVars } from "../../utils/generateColorVars";
import listClasses from "./Card2.module.css";
import classes from "./ColorPreview.module.css";
import { SectionText } from "../SectionText/SectionText";

type ViewType = "list" | "grid";

export const ColorPreview = () => {
  const colors = useThemeStore((state) => state.colors);
  const [view, setView] = useState<ViewType>("grid");
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );
  const activeColorTheme = useThemeStore((state) => state.activeColorTheme);
  const activePane = useThemeStore((state) => state.activePane);

  type CardProps = {
    color: ColorTheme;
  };

  const CardWrapper = ({ color }: CardProps) => {
    if (view === "list") {
      return <VerticalCard color={color} />;
    }
    return <HorizontalCard color={color} />;
  };

  const HorizontalCard = ({ color }: CardProps) => {
    useEffect(() => {}, []);

    const [valueOne, setValueOne] = useState(true);
    return (
      <div
        style={generateColorVars(color.colors, internalColorScheme)}
        className={cl(
          classes.card,
          activeColorTheme.colorTheme.name === color.name &&
            activePane.startsWith("colors/") &&
            classes.activeCard
        )}
      >
        <Heading className={classes.cardTitle} data-size="2xs">
          {color.name}
        </Heading>
        <Paragraph data-size="sm" className={classes.cardDesc}>
          Livet er for kort til å være grått. Fyll deg selv og dine dager med
          farger.
        </Paragraph>
        <div className={classes.checkGroup}>
          <Checkbox
            data-size="sm"
            label="Checkbox 1"
            value="one"
            onChange={() => setValueOne(!valueOne)}
            checked={valueOne}
          />
          <Checkbox data-size="sm" label="Checkbox 2" value="two" />
        </div>
        <div className={classes.btnGroup}>
          <Button data-size="sm">Primær</Button>
          <Button data-size="sm" variant="secondary">
            Sekundær
          </Button>
        </div>
      </div>
    );
  };

  const VerticalCard = ({ color }: CardProps) => {
    const [isChecked, setIsChecked] = useState(true);
    const [isSwitch, setIsSwitch] = useState(true);
    return (
      <div
        style={generateColorVars(color.colors, internalColorScheme)}
        className={cl(classes.card, listClasses.card)}
      >
        <div className={listClasses.text}>
          <Heading className={listClasses.title} data-size="2xs">
            {color.name}
          </Heading>
          <Paragraph className={classes.desc} data-size="sm">
            Farger gjør livet mer fargerikt
          </Paragraph>
        </div>
        <div className={listClasses.checkGroup}>
          <Checkbox
            data-size="sm"
            label="Checkbox"
            value="value"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <Switch
            aria-labelledby=""
            position="start"
            data-size="sm"
            checked={isSwitch}
            onChange={() => setIsSwitch(!isSwitch)}
          >
            Switch
          </Switch>
        </div>
        <div className={classes.btnGroup}>
          <Button data-size="sm">Primær</Button>
          <Button data-size="sm" variant="secondary">
            Sekundær
          </Button>
        </div>
      </div>
    );
  };
  return (
    <div className={classes.page}>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <SectionText
            heading="Se fargene dine i bruk"
            description=" Hver farge som blir valgt med verktøyet får sitt eget kort i
            seksjonen til høyre slik at du kan se hvordan fargene harmonerer
            sammen.
   "
          />
        </div>
      </div>

      <div className={classes.section}>
        <Heading className={classes.title} data-size="xs">
          Main, neutral og support
        </Heading>
        <div
          data-color-scheme={internalColorScheme}
          className={cl(
            classes.cards,
            view === "grid" ? classes.grid : classes.list
          )}
        >
          {colors.main.map((color, index) => (
            <CardWrapper key={index} color={color} />
          ))}
          {colors.neutral.map((color, index) => (
            <CardWrapper key={index} color={color} />
          ))}
          {colors.support.map((color, index) => (
            <CardWrapper key={index} color={color} />
          ))}
        </div>
        <Heading data-size="xs" className={classes.title}>
          Severity
        </Heading>

        <div
          data-color-scheme={internalColorScheme}
          className={cl(
            classes.cards,
            view === "grid" ? classes.grid : classes.list
          )}
        >
          {colors.severity.map((color, index) => (
            <CardWrapper key={index} color={color} />
          ))}
        </div>
      </div>
    </div>
  );
};
