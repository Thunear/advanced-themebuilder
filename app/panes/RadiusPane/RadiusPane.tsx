import { Button, Heading, Textfield } from "@digdir/designsystemet-react";
import cl from "clsx/lite";
import { type BaseBorderRadius, useThemeStore } from "../../../store";
import classes from "./RadiusPane.module.css";
import { ChevronLeftIcon } from "@navikt/aksel-icons";

export const RadiusPane = () => {
  const setBorderRadius = useThemeStore((state) => state.setBaseBorderRadius);
  const baseBorderRadius = useThemeStore((state) => state.baseBorderRadius);
  const activePane = useThemeStore((state) => state.activePane);
  const setActivePane = useThemeStore((state) => state.setActivePane);
  const items: { name: string; value: BaseBorderRadius }[] = [
    { name: "Ingen", value: 0 },
    { name: "Small", value: 4 },
    { name: "Medium", value: 8 },
    { name: "Large", value: 12 },
    { name: "Full", value: 9999 },
  ];

  return (
    <div>
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
      <Heading className={classes.heading} data-size="xs">
        Velg Border radius
      </Heading>
      <Heading className={classes.heading} data-size="2xs">
        Foreslått basis Border radius
      </Heading>
      <div
        className={classes.items}
        role="radiogroup"
        aria-label="Border radius"
      >
        {items.map((item, index) => (
          <div
            className={cl(
              classes.item,
              baseBorderRadius === item.value && classes.active
            )}
            key={index}
          >
            <Button
              variant="tertiary"
              data-color="neutral"
              className={cl(classes.box)}
              onClick={() => {
                setBorderRadius(item.value);
              }}
              // biome-ignore lint/a11y/useSemanticElements: <explanation>
              role="radio"
              aria-checked={baseBorderRadius === item.value}
              aria-current={baseBorderRadius === item.value}
            >
              <div className={classes.text}>{item.name}</div>
              <div
                className={classes.inner}
                style={{ borderRadius: item.value }}
              ></div>
            </Button>
          </div>
        ))}
      </div>
      <Heading className={classes.heading} data-size="2xs">
        Manuell basis Border radius
      </Heading>
      <Textfield
        label="Definer basisverdien for border-radius"
        data-size="sm"
        value={baseBorderRadius}
        onChange={(e) => {
          const updatedValue = parseInt(e.target.value);
          if (updatedValue >= 0) {
            setBorderRadius(updatedValue);
          } else {
            setBorderRadius(0);
          }
        }}
      ></Textfield>
    </div>
  );
};
