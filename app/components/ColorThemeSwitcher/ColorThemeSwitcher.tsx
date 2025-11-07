import { Dropdown } from "@digdir/designsystemet-react";
import classes from "./ColorThemeSwitcher.module.css";
import { useThemeStore } from "store";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { ColorService } from "react-color-palette";
import cl from "clsx/lite";

export const ColorThemeSwitcher = () => {
  const activeColorTheme = useThemeStore((state) => state.activeColorTheme);
  const setActiveColorTheme = useThemeStore(
    (state) => state.setActiveColorTheme
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const colors = useThemeStore((state) => state.colors);

  return (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger
        data-size="sm"
        data-color="neutral"
        variant="tertiary"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={classes.dropdown}
      >
        <div
          className={classes.color}
          style={{
            backgroundColor: activeColorTheme.colorTheme.colors.light[11].hex,
          }}
        ></div>
        <div className={classes.colorName}>
          {activeColorTheme.colorTheme.name}
        </div>
        {dropdownOpen ? (
          <ChevronUpIcon aria-hidden />
        ) : (
          <ChevronDownIcon aria-hidden />
        )}
      </Dropdown.Trigger>
      <Dropdown
        data-size="sm"
        data-color="neutral"
        open={dropdownOpen}
        onClose={() => setDropdownOpen(false)}
      >
        <Dropdown.List>
          <Dropdown.Item>
            {colors.main.map((colorTheme, index) => (
              <Dropdown.Button
                className={cl(
                  activeColorTheme.colorTheme.name === colorTheme.name &&
                    classes.active
                )}
                onClick={() => {
                  setActiveColorTheme(
                    index,
                    "main",
                    colorTheme,
                    ColorService.convert("hex", colorTheme.colors.light[11].hex)
                  );
                  setDropdownOpen(false);
                }}
                key={index}
              >
                {colorTheme.name}
              </Dropdown.Button>
            ))}
            {colors.support.map((colorTheme, index) => (
              <Dropdown.Button
                className={cl(
                  activeColorTheme.colorTheme.name === colorTheme.name &&
                    classes.active
                )}
                onClick={() => {
                  setActiveColorTheme(
                    index,
                    "support",
                    colorTheme,
                    ColorService.convert("hex", colorTheme.colors.light[11].hex)
                  );
                  setDropdownOpen(false);
                }}
                key={index}
              >
                {colorTheme.name}
              </Dropdown.Button>
            ))}
            {colors.severity.map((colorTheme, index) => (
              <Dropdown.Button
                className={cl(
                  activeColorTheme.colorTheme.name === colorTheme.name &&
                    classes.active
                )}
                onClick={() => {
                  setActiveColorTheme(
                    index,
                    "severity",
                    colorTheme,
                    ColorService.convert("hex", colorTheme.colors.light[11].hex)
                  );
                  setDropdownOpen(false);
                }}
                key={index}
              >
                {colorTheme.name}
              </Dropdown.Button>
            ))}
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  );
};
