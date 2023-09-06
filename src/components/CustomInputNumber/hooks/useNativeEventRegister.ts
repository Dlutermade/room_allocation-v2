import { MutableRefObject, useEffect } from "react";
import {
  CustomNativeEvent,
  NativeEventHandler,
  SupportNativeEvent,
  conventToCustomNativeEvent,
} from "types";

export type NativeEventRegisterObject = {
  eventName: SupportNativeEvent;
  handler: NativeEventHandler;
};

type _NativeEventRegisterObject = {
  eventName: CustomNativeEvent;
  handler: NativeEventHandler;
};

const useNativeEventRegister = (
  ref: MutableRefObject<HTMLInputElement>,
  events: NativeEventRegisterObject[]
) => {
  // register event
  useEffect(() => {
    const _events = events.map<_NativeEventRegisterObject>((event) => ({
      ...event,
      eventName: conventToCustomNativeEvent(event.eventName),
    }));

    _events.forEach((event) =>
      ref.current.addEventListener(event.eventName, event.handler)
    );

    return () => {
      _events.forEach((event) =>
        ref.current.removeEventListener(event.eventName, event.handler)
      );
    };
  }, [events]);
};

export default useNativeEventRegister;
