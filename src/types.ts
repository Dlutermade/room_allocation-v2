export type NativeEventKey<T extends keyof HTMLElementEventMap> = T;

export type SupportNativeEventList = Readonly<
  [NativeEventKey<"change">, NativeEventKey<"blur">]
>;

export type SupportNativeEvent = SupportNativeEventList[number];
export type CustomNativeEvent = `custom_${SupportNativeEvent}`;

export const conventToCustomNativeEvent = (
  event: SupportNativeEvent
): CustomNativeEvent => `custom_${event}`;

export type NativeEventHandler = (
  event: Event & { target: HTMLInputElement }
) => void;
