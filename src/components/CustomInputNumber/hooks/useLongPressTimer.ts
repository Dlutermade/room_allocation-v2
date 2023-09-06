import { useCallback, useMemo, useRef } from "react";
import { capitalize } from "utils/string";

export type Action<T extends string> = {
  name: T;
  handler: VoidFunction;
};

type ActionRecord<T extends string> = Record<
  `handleStart${Capitalize<Action<T>["name"]>}Timer`,
  VoidFunction
>;

const useLongPressTimer = <T extends string>(actions: Action<T>[]) => {
  const firstTimer = useRef<NodeJS.Timeout>();
  const secondTimer = useRef<NodeJS.Timeout>();

  const handleStopTimer = useCallback(() => {
    clearTimeout(firstTimer.current);
    clearInterval(secondTimer.current);
  }, []);

  const record = useMemo<ActionRecord<T>>(
    () =>
      actions.reduce(
        (prev, curr) => ({
          ...prev,
          // 原生兩段式 遞增 與 遞減
          [`handleStart${capitalize(curr.name)}Timer`]: () => {
            handleStopTimer();

            curr.handler();

            firstTimer.current = setTimeout(() => {
              secondTimer.current = setInterval(curr.handler, 50);
            }, 500);
          },
        }),
        {} as ActionRecord<T>
      ),
    [actions]
  );

  return {
    ...record,
    handleStopTimer,
  };
};

export default useLongPressTimer;
