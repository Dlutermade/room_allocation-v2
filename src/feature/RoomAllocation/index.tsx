import Room from "feature/Room";
import React, { useEffect, useMemo, useState } from "react";

export type RoomData = {
  adult: number;
  child: number;
};

type Props = {
  guest: number;
  room: number;
  onChange: (result: RoomData[]) => void;
};

const RoomAllocation = ({ guest, room, onChange }: Props) => {
  const [rooms, setRoomsChange] = useState<RoomData[]>([]);

  /**
   * 每當 room 和 guest 產生變化，即重新分配
   *  */
  useEffect(() => {
    setRoomsChange(
      Array.from({ length: room }, () => ({ adult: 1, child: 0 }))
    );
  }, [room, guest]);

  const unallocatedCount = useMemo(
    () =>
      guest - rooms.reduce((prev, curr) => prev + curr.adult + curr.child, 0),
    [rooms]
  );

  useEffect(() => onChange(rooms), [rooms]);

  const roomsRender = rooms.map((item, idx) => (
    <Room
      guest={guest}
      unallocatedCount={unallocatedCount}
      max={4}
      adult={item.adult}
      child={item.child}
      idx={idx}
      disabled={room === guest}
      setRoomsChange={setRoomsChange}
      key={`rooms-${idx}`}
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

      {roomsRender}
    </div>
  );
};

export default RoomAllocation;
