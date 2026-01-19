import { RovingFocusItem } from "@digdir/designsystemet-react";
import {
  type Color,
  type ColorNames,
  type ThemeInfo,
  colorMetadata,
  getColorMetadataByNumber,
} from "../../../colors";
import cl from "clsx/lite";

import { ColorSquare } from "../ColorSquare/ColorSquare";

import { ColorModal } from "../../components";
import { createRef, useRef } from "react";
import { useThemeStore } from "../../../store";
import classes from "./ColorGroup.module.css";

type GroupProps = {
  header: string;
  colorNames: ColorNames[];
  colorScale: ThemeInfo;
  showColorMeta?: boolean;
  names?: string[];
  namespace: string;
};

export const ColorGroup = ({
  header,
  colorNames,
  showColorMeta,
  names,
  colorScale,
  namespace,
}: GroupProps) => {
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );

  const colorModalRefs = useRef<React.RefObject<HTMLDialogElement | null>[]>(
    []
  );
  if (colorModalRefs.current.length !== colorNames.length) {
    colorModalRefs.current = Array(colorNames.length)
      .fill(null)
      .map(() => createRef<HTMLDialogElement>());
  }

  return (
    <div className={classes.colorGroup} style={{ flex: colorNames.length }}>
      {header && <div className={cl(classes.header)}>{header}</div>}
      {header && names && (
        <div className={classes.names}>
          {names.map((name, index) => (
            <div key={index + "name" + namespace}>{name}</div>
          ))}
        </div>
      )}

      <div className={cl(classes.colors)}>
        {colorNames.map((colorName, index) => {
          const { number, hex, colorOverride } =
            colorScale[internalColorScheme][
              colorMetadata[colorName].number - 1
            ];
          const displayHex = (colorOverride || hex) as `#${string}`;
          const color: Color = {
            ...getColorMetadataByNumber(number),
            number,
            hex: displayHex,
          };
          return (
            <div className={classes.color} key={index + "fragment" + namespace}>
              <ColorModal
                colorModalRef={colorModalRefs.current[index]}
                namespace={namespace}
                color={color}
              />
              <RovingFocusItem value={namespace + number} asChild>
                <ColorSquare
                  color={displayHex}
                  colorName={colorName}
                  showColorMeta={showColorMeta}
                  aria-label={`Se mer om ${namespace} ${color?.displayName}`}
                />
              </RovingFocusItem>
            </div>
          );
        })}
      </div>
    </div>
  );
};
