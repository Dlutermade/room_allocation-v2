import { MutableRefObject, useEffect } from "react";
import { NativeEventHandler } from "types";

export type NativeEventRegisterObject = {
  eventName: keyof HTMLElementEventMap;
  handler: NativeEventHandler;
};

const useNativeEventRegister = (
  ref: MutableRefObject<HTMLInputElement>,
  events: NativeEventRegisterObject[]
) => {
  // register event
  useEffect(() => {
    events.forEach((event) =>
      ref.current.addEventListener(event.eventName, event.handler)
    );

    return () => {
      events.forEach((event) =>
        ref.current.removeEventListener(event.eventName, event.handler)
      );
    };
  }, [events]);
};

export default useNativeEventRegister;
