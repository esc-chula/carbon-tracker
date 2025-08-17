import { useState } from "react";

// ----------------------------------------------------------------------

export type UseSetStateReturn<T> = {
  state: T;
  canReset: boolean;
  onResetState: () => void;
  setState: (updateState: T | Partial<T>) => void;
  setField: (name: keyof T, updateValue: T[keyof T]) => void;
};

export function useSetState<T>(initialState: T): UseSetStateReturn<T> {
  const [state, set] = useState(initialState);

  const canReset = !isEqual(state, initialState);

  const setState = (updateState: T | Partial<T>) => {
    set((prevValue: T) => ({ ...prevValue, ...updateState }));
  };

  const setField = (name: keyof T, updateValue: T[keyof T]) => {
    setState({ [name]: updateValue } as Partial<T>);
  };

  const onResetState = () => {
    set(initialState);
  };

  return {
    state,
    setState,
    setField,
    onResetState,
    canReset,
  };
}

// ---------------------------------------------------------------------------------

function isEqual(a: unknown, b: unknown): boolean {
  if (a === null || a === undefined || b === null || b === undefined) {
    return a === b;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (
    typeof a === "string" ||
    typeof a === "number" ||
    typeof a === "boolean"
  ) {
    return a === b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    return a.every((item, index) => isEqual(item, b[index]));
  }

  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every((key) =>
      isEqual(a[key as keyof typeof a], b[key as keyof typeof b]),
    );
  }

  return false;
}

export { isEqual };
