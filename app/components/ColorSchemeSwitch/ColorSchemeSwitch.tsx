import { ToggleGroup } from "@digdir/designsystemet-react";
import { useThemeStore } from "store";

export const ColorSchemeSwitch = () => {
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );
  const setInternalColorScheme = useThemeStore(
    (state) => state.setInternalColorScheme
  );
  return (
    <ToggleGroup
      value={internalColorScheme}
      name="toggle-group-nuts"
      data-size="sm"
      data-color="neutral"
      variant="secondary"
      className="subtle-toggle-group"
      onChange={(value) => {
        setInternalColorScheme(value as "light" | "dark");
      }}
    >
      <ToggleGroup.Item value="light">Lys modus</ToggleGroup.Item>
      <ToggleGroup.Item value="dark">Mørk modus</ToggleGroup.Item>
    </ToggleGroup>
  );
};
