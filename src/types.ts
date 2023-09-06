export type NativeEventHandler = (
  event: Event & { target: HTMLInputElement }
) => void;
