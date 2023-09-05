import React from "react";
import RoomAllocation from "feature/RoomAllocation";

const App = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <RoomAllocation guest={100} room={1} onChange={() => {}} />
    </div>
  );
};

export default App;
