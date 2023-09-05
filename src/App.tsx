import React from "react";
import RoomAllocation from "feature/RoomAllocation";

const App = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <RoomAllocation guest={10} room={3} onChange={console.log} />
    </div>
  );
};

export default App;
