import { useEffect, useRef } from "react";

type VoidFunction = () => void;

export type Action<T = string> = {
  name: T;
  handler: VoidFunction;
};

type ActionRecord<T extends string> = Record<
  `handleStart${Action<T>["name"]}`,
  VoidFunction
>;

const useTimer = <T extends string = string>(
  actions: Action<T>[],
  delay: number,
  isStopTimer?: boolean
) => {
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isStopTimer && timer.current) {
      clearInterval(timer.current);
    }
  }, [isStopTimer]);

  const actionRecord = actions.reduce<ActionRecord<T>>(
    (prev, curr) => ({
      ...prev,
      [`handleStart${curr.name}`]: () => {
        curr.handler();
        clearInterval(timer.current);

        timer.current = setInterval(curr.handler, delay);
      },
    }),
    {} as ActionRecord<T>
  );

  const handleStopTimer = () => {
    clearInterval(timer.current);
  };

  return {
    ...actionRecord,
    handleStopTimer,
  };
};

export default useTimer;
