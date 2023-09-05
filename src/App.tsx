import React, { useEffect, useRef, useState } from "react";
import CustomInputNumber from "components/CustomInputNumber";

const App = () => {
  const [d, setD] = useState(false);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timer.current = setTimeout(setD, 5000, true);

    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  console.log(d);

  return (
    <div>
      <CustomInputNumber
        min={0}
        max={1000}
        step={5}
        name="test"
        value={1}
        disabled={d}
        onChange={(e) => {}}
        onBlur={(e) => {}}
      />
    </div>
  );
};

export default App;
