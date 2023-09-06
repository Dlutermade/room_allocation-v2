import { MutableRefObject, useMemo } from "react";
import { capitalize } from "utils/string";

type NativeEvent = keyof HTMLElementEventMap;

type NativeEventTriggerRecord<T extends NativeEvent> = Record<
  `on${Capitalize<T>}Trigger`,
  VoidFunction
>;

export const eventTriggerList = ["change", "blur"] as const;

const useNativeEventTrigger = <T extends NativeEvent>(
  ref: MutableRefObject<HTMLInputElement>,
  events: readonly T[]
) => {
  const record = useMemo(
    () =>
      events.reduce<NativeEventTriggerRecord<T>>(
        (prev, curr) => ({
          ...prev,
          [`on${capitalize(curr)}Trigger`]: () => {
            ref.current.dispatchEvent(new Event(curr));
          },
        }),
        {} as NativeEventTriggerRecord<T>
      ),
    [events]
  );

  return { ...record };
};

export default useNativeEventTrigger;
