import CustomInputNumber from "components/CustomInputNumber";
import Room from "feature/Room";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Result = {
  adult: number;
  child: number;
};

type Props = {
  guest: number;
  room: number;
  onChange: (result: Result[]) => void;
};

const RoomAllocation = ({ guest, room, onChange }: Props) => {
  const [result, setResult] = useState<Result[]>([]);
  const prevChangeRoom = useRef(-1);

  const unallocatedCount = useMemo(
    () =>
      guest - result.reduce((prev, curr) => prev + curr.adult + curr.child, 0),
    [result]
  );

  /**
   * 每當 room 和 guest 產生變化，即重新分配
   *  */
  useEffect(() => {
    setResult(Array.from({ length: room }, () => ({ adult: 0, child: 0 })));
  }, [room, guest]);

  const rooms = result.map((item, idx) => (
    <Room
      guest={guest}
      unallocatedCount={unallocatedCount}
      adult={item.adult}
      child={item.child}
      idx={idx}
      prevChangeRoom={prevChangeRoom}
      key={`rooms-${idx}-${item.adult}-${item.child}`}
    />
  ));

  return (
    <div className="flex flex-col gap-4 w-96">
      <h2 className="text-2xl font-bold">
        住客人數: {guest}人 / {room}房
      </h2>
      <div className="p-4 text-lg font-semibold bg-blue-400 border-2 border-blue-600 rounded-lg text-slate-800">
        尚未分配人數: {unallocatedCount}人
      </div>

      {rooms}
    </div>
  );
};

export default RoomAllocation;
