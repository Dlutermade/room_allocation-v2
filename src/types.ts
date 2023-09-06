export type NativeEventKey<T extends keyof HTMLElementEventMap> = T;

export type SupportNativeEventList = Readonly<
  [NativeEventKey<"change">, NativeEventKey<"blur">]
>;

export type SupportNativeEvent = SupportNativeEventList[number];

export type NativeEventHandler = (
  event: Event & { target: HTMLInputElement }
) => void;
