import React, { useEffect, useMemo, useState } from "react";
import RoomAllocation from "feature/RoomAllocation";
import CustomInputNumber from "components/CustomInputNumber";
import { NativeEventHandler } from "types";

const App = () => {
  const [value, setValue] = useState(0);
  const onChange = useMemo<NativeEventHandler>(
    () => (e) => {
      setValue(+e.target.value);
      console.log("change", e.target.value);
      console.log("change", e.target.name);
    },
    []
  );

  const onBlur = useMemo<NativeEventHandler>(
    () => (e) => {
      console.log("blur", e.target.value);
      console.log("blur", e.target.name);
    },
    [value]
  );

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setTimeout(setDisabled, 5_000, true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {
        <RoomAllocation
          guest={3}
          room={2}
          onChange={console.log.bind(this, "result")}
        />
      }
      {
        <>
          <CustomInputNumber
            min={0}
            max={1000}
            step={1}
            name={"test"}
            value={value}
            disabled={false}
            onChange={onChange}
            onBlur={onBlur}
          />
          <input className="border-2" type="number" />
        </>
      }
      {
        <>
          <h2>沒有外部 state</h2>
          <CustomInputNumber
            name={"test2"}
            onChange={(e) => {
              console.log("no component state change", e.target.value);
              console.log("no component state change ", e.target.name);
            }}
          />
          <input className="border-2" type="number" />
        </>
      }

      {
        <>
          <h2>5秒後 disabled</h2>
          <CustomInputNumber
            name={"test2"}
            disabled={disabled}
            onChange={(e) => {
              console.log("5s disabled change", e.target.value);
              console.log("5s disabled change ", e.target.name);
            }}
          />
          <input className="border-2" type="number" />
        </>
      }
    </div>
  );
};

export default App;
