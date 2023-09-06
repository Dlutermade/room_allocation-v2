import { MutableRefObject, useMemo } from "react";
import { SupportNativeEventList, SupportNativeEvent } from "types";
import { capitalize } from "utils/string";

type NativeEventTriggerRecord<T extends SupportNativeEvent> = Record<
  `on${Capitalize<T>}Trigger`,
  VoidFunction
>;

export const eventTriggerList: SupportNativeEventList = ["change", "blur"];

const useNativeEventTrigger = <T extends SupportNativeEvent>(
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
