import { RovingFocusItem } from "@digdir/designsystemet-react";
import type { ThemeInfo } from "colors";
import { ColorSquare } from "../ColorSquare/ColorSquare";
import { useThemeStore, type ColorTheme } from "store";

type DecorativeColorRowProps = {
  colorTheme: ColorTheme;
};

export const DecorativeColorRow = ({ colorTheme }: DecorativeColorRowProps) => {
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );

  const decorativeColors =
    colorTheme.decorativeColors?.[internalColorScheme] ?? [];

  return (
    <div>
      {decorativeColors.map((color, index) => (
        <div key={index} style={{ display: "inline-block", marginRight: 8 }}>
          <ColorSquare
            color={color}
            colorName="background-default"
            aria-label={`Se mer om background-default`}
          />
        </div>
      ))}
    </div>
  );
};
