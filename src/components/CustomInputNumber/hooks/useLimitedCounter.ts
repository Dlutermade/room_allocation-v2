import { useCallback, useEffect, useState } from "react";
import { clamp } from "utils/number";

export default (
  initValue: number,
  min: number,
  max: number,
  step: number,
  disabled: boolean
) => {
  const [value, _setValue] = useState(initValue);

  useEffect(() => {
    _setValue((prev) => clamp(prev, min, max));
  }, [min, max]);

  const setNewValue = useCallback(
    (newValue: number) =>
      _setValue((prev) => (disabled ? prev : clamp(newValue, min, max))),
    [min, max, disabled]
  );

  const setAddValue = useCallback(
    (addValue: number) =>
      _setValue((prev) => (disabled ? prev : clamp(prev + addValue, min, max))),
    [min, max, disabled]
  );

  const handleIncreases = useCallback(() => {
    setAddValue(step);
  }, [step, setAddValue]);

  const handleDecreases = useCallback(() => {
    setAddValue(-step);
  }, [step, setAddValue]);

  return {
    value,
    setNewValue,
    setAddValue,
    handleIncreases,
    handleDecreases,
  };
};
