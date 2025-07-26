import type { Dispatch, SetStateAction } from "react";

import { useState } from "react";

// ----------------------------------------------------------------------

export type UseBooleanReturn = {
  value: boolean;
  onTrue: () => void;
  onFalse: () => void;
  onToggle: () => void;
  setValue: Dispatch<SetStateAction<boolean>>;
};

export function useBoolean(defaultValue = false): UseBooleanReturn {
  const [value, setValue] = useState(defaultValue);

  const onTrue = () => {
    setValue(true);
  };

  const onFalse = () => {
    setValue(false);
  };

  const onToggle = () => {
    setValue((prev) => !prev);
  };

  return {
    value,
    onTrue,
    onFalse,
    onToggle,
    setValue,
  };
}
