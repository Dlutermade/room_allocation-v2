import React, { useMemo, useState } from "react";
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

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {
        <RoomAllocation
          guest={10}
          room={3}
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
    </div>
  );
};

export default App;
