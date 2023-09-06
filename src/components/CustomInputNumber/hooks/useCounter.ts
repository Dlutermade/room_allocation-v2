import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { clamp } from "utils/number";

const useCounter = (
  value: number | undefined,
  min: number,
  max: number,
  step: number,
  onChangeTrigger: VoidFunction
) => {
  const [counterValue, setCounterValue] = useState(clamp(value || 0, min, max));

  // change `value` also change `counterValue`
  useEffect(() => {
    if (value === undefined) return;
    setCounterValue(clamp(value, min, max));
  }, [value, value === counterValue, min, max]);

  // change `counterValue` trigger onChange
  useLayoutEffect(() => {
    if (value !== counterValue) onChangeTrigger();
  }, [counterValue]);

  const onIncreases = useCallback(
    () => setCounterValue((prev) => clamp(prev + step, min, max)),
    [step, min, max]
  );
  const onDecreases = useCallback(
    () => setCounterValue((prev) => clamp(prev - step, min, max)),
    [step, min, max]
  );

  return {
    counterValue,
    setCounterValue,
    onIncreases,
    onDecreases,
  };
};

export default useCounter;
