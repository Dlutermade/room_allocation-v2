import {
  ChangeEventHandler,
  ComponentProps,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { NativeEventHandler } from "types";
import { cn } from "utils/cn";
import { clamp } from "utils/number";
import useCounter from "./hooks/useCounter";
import useEventTrigger, {
  eventTriggerList,
} from "./hooks/useNativeEventTrigger";
import useLongPressTimer, { Action } from "./hooks/useLongPressTimer";
import useNativeEventRegister, {
  NativeEventRegisterObject,
} from "./hooks/useNativeEventRegister";

type Props = {
  min?: number;
  max?: number;
  step?: number;
  name: string;
  value?: number;
  disabled?: boolean;
  onChange?: NativeEventHandler;
  onBlur?: NativeEventHandler;
} & Omit<ComponentProps<"input">, "onChange" | "onBlur" | "value">;

const noop = () => {};

const CustomInputNumber = ({
  min = -Infinity,
  max = Infinity,
  step = 1,
  name,
  value,
  disabled = false,
  onChange = noop,
  onBlur = noop,
  ...rest
}: Props) => {
  const elRef = useRef<HTMLInputElement>();

  const events = useMemo<NativeEventRegisterObject[]>(
    () => [
      {
        eventName: "change",
        handler: onChange,
      },
      {
        eventName: "blur",
        handler: onBlur,
      },
    ],
    [onChange, onBlur]
  );
  useNativeEventRegister(elRef, events);

  const { onChangeTrigger, onBlurTrigger } = useEventTrigger(
    elRef,
    eventTriggerList
  );

  const { counterValue, setCounterValue, onDecreases, onIncreases } =
    useCounter(value, min, max, step, onChangeTrigger);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCounterValue(clamp(Number(e.target.value), min, max));
  };

  type Operation = "increment" | "decrement";
  const timerActions = useMemo<Action<Operation>[]>(
    () => [
      {
        name: "increment",
        handler: onIncreases,
      },
      {
        name: "decrement",
        handler: onDecreases,
      },
    ],
    []
  );

  const {
    handleStartDecrementTimer,
    handleStartIncrementTimer,
    handleStopTimer,
  } = useLongPressTimer(timerActions);

  useEffect(() => {
    if (disabled) {
      handleStopTimer();
    }
  }, [disabled]);

  return (
    <div className="flex gap-2 text-base custom-input-number">
      <button
        className={cn(
          "w-12 h-12 text-2xl border-2 border-gray-800 rounded-lg",
          disabled && "cursor-not-allowed"
        )}
        onTouchStart={handleStartDecrementTimer}
        onTouchEnd={handleStopTimer}
        onMouseDown={handleStartDecrementTimer}
        onMouseUp={handleStopTimer}
        onBlur={onBlurTrigger}
        disabled={disabled}
      >
        -
      </button>
      <input
        {...rest}
        className={cn(
          "w-12 h-12 text-center border-2 border-indigo-700 rounded-lg outline-0 focus:border-indigo-500",
          disabled && "cursor-not-allowed border-white"
        )}
        ref={elRef}
        type="number"
        value={counterValue}
        min={min}
        max={max}
        step={step}
        name={name}
        disabled={disabled}
        onChange={handleChange}
        onBlur={null}
      />
      <button
        className={cn(
          "w-12 h-12 text-2xl border-2 border-gray-800 rounded-lg",
          disabled && "cursor-not-allowed"
        )}
        onTouchStart={handleStartIncrementTimer}
        onTouchEnd={handleStopTimer}
        onMouseDown={handleStartIncrementTimer}
        onMouseUp={handleStopTimer}
        onBlur={onBlurTrigger}
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
};

export default CustomInputNumber;
