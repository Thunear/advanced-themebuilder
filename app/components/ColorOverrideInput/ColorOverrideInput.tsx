import { useThemeStore } from "store";
import classes from "./ColorOverrideInput.module.css";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "@digdir/designsystemet-react";

type ColorOverrideInputProps = {
  name: string;
  colorPreview: string;
  value: string;
  initialValue: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
};

export const ColorOverrideInput = ({
  name,
  colorPreview,
  value,
  onChange,
  initialValue,
}: ColorOverrideInputProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleChange = (v: string) => {
    if (v !== currentValue) {
      setCurrentValue(v);
      onChange?.(v);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.label}>{name}</div>
      <div className={classes.inputContainer}>
        <div className={classes.colorPreviewContainer}>
          <div
            className={classes.colorPreview}
            style={{ backgroundColor: value || colorPreview }}
          ></div>
        </div>
        <input
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          className={classes.input}
          type="text"
          placeholder="#hex"
        />
        {value && (
          <Button
            className={classes.clearButton}
            data-color="neutral"
            variant="tertiary"
            data-size="sm"
            onClick={() => {
              handleChange("");
            }}
          >
            <XMarkIcon title="a11y-title" fontSize="1.5rem" />
          </Button>
        )}
      </div>
    </div>
  );
};
