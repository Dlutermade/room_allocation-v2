import React from "react";
import CustomInputNumber from "components/CustomInputNumber";

const App = () => {
  return (
    <div>
      <CustomInputNumber
        min={0}
        max={1000}
        step={5}
        name="test"
        value={1}
        disabled={false}
        onChange={(e) => {}}
        onBlur={(e) => {}}
      />
    </div>
  );
};

export default App;
