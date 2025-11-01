import { Button, ToggleGroup, Tooltip } from "@digdir/designsystemet-react";
import classes from "./Toolbar.module.css";
import { ChevronRightLastIcon } from "@navikt/aksel-icons";
import { useThemeStore } from "store";

export function Toolbar() {
  const setShrinkSidebar = useThemeStore((state) => state.setShrinkSidebar);
  const shrinkSidebar = useThemeStore((state) => state.shrinkSidebar);
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );
  const setInternalColorScheme = useThemeStore(
    (state) => state.setInternalColorScheme
  );

  return (
    <div className={classes.toolbar}>
      <div className={classes.left}>Tool</div>
      <div className={classes.right}>
        <ToggleGroup
          value={internalColorScheme}
          name="toggle-group-nuts"
          data-size="sm"
          data-color="neutral"
          variant="secondary"
          className="subtle-toggle-group"
          onChange={(value) => {
            setInternalColorScheme(value as "light" | "dark");
            console.log("Selected:", value);
          }}
        >
          <ToggleGroup.Item value="light">Lys modus</ToggleGroup.Item>
          <ToggleGroup.Item value="dark">Mørk modus</ToggleGroup.Item>
        </ToggleGroup>

        <Button
          variant="tertiary"
          data-color="neutral"
          onClick={() => setShrinkSidebar(!shrinkSidebar)}
        >
          <ChevronRightLastIcon title="a11y-title" fontSize="2.5rem" />
        </Button>
      </div>
    </div>
  );
}
