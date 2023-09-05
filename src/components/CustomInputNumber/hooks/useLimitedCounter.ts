import { useCallback, useEffect, useState } from "react";
import { clamp } from "utils/number";

export default (initValue: number, min: number, max: number, step: number) => {
  const [value, _setValue] = useState(initValue);

  useEffect(() => {
    _setValue((prev) => clamp(prev, min, max));
  }, [min, max]);

  const setNewValue = useCallback(
    (newValue: number) => _setValue(clamp(newValue, min, max)),
    [min, max]
  );

  const setAddValue = useCallback(
    (addValue: number) => _setValue((prev) => clamp(prev + addValue, min, max)),
    [min, max]
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
