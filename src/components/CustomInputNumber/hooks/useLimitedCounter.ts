import { useCallback, useEffect, useRef } from "react";
import { clamp } from "utils/number";

export default (
  initValue: number,
  onChange: (event: Event) => void,
  min: number,
  max: number,
  step: number,
  disabled: boolean
) => {
  const elRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (elRef.current) {
      elRef.current.addEventListener("onChange", onChange);

      return () => elRef.current.removeEventListener("onChange", onChange);
    }
  }, [onChange]);

  const tigerChange = () => {
    const onChangeEvent = new Event("onChange");
    elRef.current.dispatchEvent(onChangeEvent);
  };

  useEffect(() => {
    elRef.current.value = initValue.toString();
    tigerChange();
  }, [initValue]);

  useEffect(() => {
    if (!elRef.current) return;
    const value = Number(elRef.current.value);

    elRef.current.value = clamp(value, min, max).toString();
    tigerChange();
  }, [min, max]);

  const setNewValue = useCallback(
    (newValue: number) => {
      const value = Number(elRef.current.value);

      elRef.current.value = disabled
        ? value.toString()
        : clamp(newValue, min, max).toString();

      tigerChange();
    },
    [min, max, disabled]
  );

  const setAddValue = useCallback(
    (addValue: number) => {
      const value = Number(elRef.current.value);

      elRef.current.value = disabled
        ? value.toString()
        : clamp(value + addValue, min, max).toString();

      tigerChange();
    },
    [min, max, disabled]
  );

  const handleIncreases = useCallback(() => {
    setAddValue(step);
  }, [step, setAddValue]);

  const handleDecreases = useCallback(() => {
    setAddValue(-step);
  }, [step, setAddValue]);

  return {
    elRef,
    setNewValue,
    setAddValue,
    handleIncreases,
    handleDecreases,
  };
};
