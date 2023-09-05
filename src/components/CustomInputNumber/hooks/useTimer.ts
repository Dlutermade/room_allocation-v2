import { useEffect, useRef } from "react";

type VoidFunction = () => void;

export type Action<T = string> = {
  name: T;
  handler: VoidFunction;
};

const useTimer = <T extends string = string>(
  actions: Action<T>[],
  delay: number,
  isClearTimer?: boolean
) => {
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isClearTimer && timer.current) {
      clearInterval(timer.current);
    }
  }, [isClearTimer]);

  type ActionRecord = Record<
    `handleStart${(typeof actions)[number]["name"]}`,
    VoidFunction
  >;

  const actionRecord = actions.reduce<ActionRecord>(
    (prev, curr) => ({
      ...prev,
      [`handleStart${curr.name}`]: () => {
        curr.handler();
        clearInterval(timer.current);

        timer.current = setInterval(curr.handler, delay);
      },
    }),
    {} as ActionRecord
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
