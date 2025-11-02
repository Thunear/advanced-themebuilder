import { Heading, Paragraph, ToggleGroup } from "@digdir/designsystemet-react";
import type { ThemeInfo } from "../../../colors";
import {
  ComponentIcon,
  OpenSourceIcon,
  PiggybankFillIcon,
} from "@navikt/aksel-icons";
import cl from "clsx/lite";
import { useEffect, useRef, useState } from "react";
import { useThemeStore } from "../../../store";
import { generateColorVars } from "../../utils/generateColorVars";
import { GradientSpace } from "../GradientSpace/GradientSpace ";
import { Card } from "./Card/Card";
import classes from "./ColorDetail.module.css";
import { People } from "./People/People";

export const ColorDetail = () => {
  const colors = useThemeStore((state) => state.colors);
  const [activeColors, setActiveColors] = useState<ThemeInfo>(
    colors.main[0].colors
  );
  const pageRef = useRef<HTMLDivElement>(null);
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );
  const activeColorScale = useThemeStore((state) => state.activeColorScale);
  const setActiveColorScale = useThemeStore(
    (state) => state.setActiveColorScale
  );

  useEffect(() => {
    const pageElement = pageRef.current;
    if (pageElement) {
      const styles = generateColorVars(activeColors, internalColorScheme);
      for (const [key, value] of Object.entries(styles)) {
        pageElement.style.setProperty(key, value);
      }
    }
  }, [activeColors, colors, internalColorScheme]);

  useEffect(() => {
    setActiveColors(
      colors.main.find((color) => color.name === activeColorScale)?.colors ||
        colors.support.find((color) => color.name === activeColorScale)
          ?.colors ||
        colors.neutral.find((color) => color.name === activeColorScale)
          ?.colors ||
        colors.severity.find((color) => color.name === activeColorScale)
          ?.colors ||
        colors.main[0].colors
    );
  }, [colors, activeColorScale]);

  return (
    <div className={classes.page}>
      <Heading className={classes.title}>Detaljvisning av fargeskala</Heading>
      <Paragraph className={classes.desc}>
        Her kan du se en mer detaljert visning av hvordan den valgte
        fargeskalaen ser ut
      </Paragraph>
      <div
        className={classes.panel}
        data-color-scheme={internalColorScheme}
        ref={pageRef}
      >
        <div className={classes.header}>
          <div className={classes.subHeader}>Velg fargeskala</div>
          <ToggleGroup
            value={activeColorScale}
            name="toggle-group-nuts"
            onChange={setActiveColorScale}
            data-size="sm"
          >
            {colors.main.map((color) => (
              <ToggleGroup.Item key={color.name} value={color.name}>
                {color.name}
              </ToggleGroup.Item>
            ))}
            {colors.neutral.map((color) => (
              <ToggleGroup.Item key={color.name} value={color.name}>
                {color.name}
              </ToggleGroup.Item>
            ))}
            {colors.support.map((color) => (
              <ToggleGroup.Item key={color.name} value={color.name}>
                {color.name}
              </ToggleGroup.Item>
            ))}
            {colors.severity.map((color) => (
              <ToggleGroup.Item key={color.name} value={color.name}>
                {color.name}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup>
        </div>
        <div className={classes.container}>
          <div className={classes.left}>
            <div className={classes.cards}>
              <Card
                type={1}
                title="Surface eksempel"
                desc="Knows, something and been me expectations "
                icon={<OpenSourceIcon />}
              />
              <Card
                type={2}
                title="Surface eksempel"
                desc="Knows, something and been me expectations "
                icon={<ComponentIcon />}
              />
              <Card
                type={3}
                title="Surface eksempel"
                desc="Knows, something and been me expectations "
                icon={<PiggybankFillIcon />}
              />
            </div>
            <div className={classes.lists}>
              <div className={classes.card}>
                <div className={classes.cardHeading}>Border fargene</div>
                <div className={classes.bars}>
                  <div className={cl(classes.barItem, classes.barOne)}>
                    <div className={classes.barHeading}>Border subtle</div>
                  </div>
                  <div className={cl(classes.barItem, classes.barTwo)}>
                    <div className={classes.barHeading}>Border default</div>
                  </div>
                  <div className={cl(classes.barItem, classes.barThree)}>
                    <div className={classes.barHeading}>Border strong</div>
                  </div>
                </div>
              </div>
              <div className={cl(classes.card, classes.cardCentered)}>
                <div className={classes.circle}>50</div>
              </div>
            </div>
          </div>
          <div className={classes.right}>
            <People />
          </div>
        </div>
        <GradientSpace
          themeInfo={activeColors}
          colorScheme={internalColorScheme}
        />
      </div>
    </div>
  );
};
