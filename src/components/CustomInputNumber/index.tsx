import React, {
  ChangeEventHandler,
  FocusEventHandler,
  useCallback,
  useMemo,
} from "react";
import { cn } from "utils/cn";
import useLimitedCounter from "./hooks/useLimitedCounter";
import useTimer, { Action } from "./hooks/useTimer";

type Props = {
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  disabled: boolean;
  onChange: (event: Event & { target: HTMLInputElement }) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

const CustomInputNumber = ({
  min,
  max,
  step,
  name,
  value,
  disabled,
  onChange,
  onBlur,
}: Props) => {
  const { elRef, setNewValue, handleIncreases, handleDecreases } =
    useLimitedCounter(value, onChange, min, max, step, disabled);

  type Operation = "Increment" | "Decrement";

  const Actions = useMemo<Action<Operation>[]>(
    () => [
      {
        name: "Increment",
        handler: handleIncreases,
      },
      {
        name: "Decrement",
        handler: handleDecreases,
      },
    ],
    [handleIncreases, handleDecreases]
  );

  const { handleStopTimer, handleStartIncrement, handleStartDecrement } =
    useTimer(Actions, 500, disabled || value === max || value === min);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setNewValue(Number(e.target.value));
    },
    [setNewValue]
  );

  const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onBlur?.(e);
    },
    [onBlur]
  );

  return (
    <div className="flex gap-2 text-base">
      <button
        className={cn(
          "w-12 h-12 text-2xl border-2 border-gray-800 rounded-lg",
          disabled && "cursor-not-allowed"
        )}
        onMouseDown={handleStartDecrement}
        onMouseUp={handleStopTimer}
      >
        -
      </button>
      <input
        className={cn(
          "w-12 h-12 text-center border-2 border-indigo-700 rounded-lg outline-0 focus:border-indigo-500",
          disabled && "cursor-not-allowed border-white"
        )}
        ref={elRef}
        type="number"
        min={min}
        max={max}
        name={name}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button
        className={cn(
          "w-12 h-12 text-2xl border-2 border-gray-800 rounded-lg",
          disabled && "cursor-not-allowed"
        )}
        onMouseDown={handleStartIncrement}
        onMouseUp={handleStopTimer}
      >
        +
      </button>
    </div>
  );
};

export default CustomInputNumber;
