import CustomInputNumber from "components/CustomInputNumber";
import { RoomData } from "feature/RoomAllocation";
import React, { SetStateAction, Dispatch, useCallback, useMemo } from "react";
import { NativeEventHandler } from "types";
import { clamp } from "utils/number";

type Props = {
  unallocatedCount: number;
  max: number;
  adult: number;
  child: number;
  idx: number;
  disabled: boolean;
  setRooms: Dispatch<SetStateAction<RoomData[]>>;
};

const Room = ({
  unallocatedCount,
  max,
  adult,
  child,
  idx,
  disabled,
  setRooms,
}: Props) => {
  const handleAdultChange = useCallback<NativeEventHandler>(
    (e) => {
      setRooms((prev) => {
        let newValue = Number(e.target.value);
        const newTotalGuestOfRoom = newValue + prev[idx].child;
        const totalUnallocatedOfRoom = max - prev[idx].child;

        if (newTotalGuestOfRoom >= max) {
          newValue = clamp(newValue, 1, totalUnallocatedOfRoom);
        }

        const offset = newValue - prev[idx].adult;
        if (offset > unallocatedCount) {
          newValue = clamp(newValue, 1, prev[idx].adult + unallocatedCount);
        }

        // not change
        if (newValue === prev[idx].adult) {
          return prev;
        }

        return [
          ...prev.slice(0, idx),
          {
            ...prev[idx],
            adult: newValue,
          },
          ...prev.slice(idx + 1),
        ];
      });
    },
    [unallocatedCount]
  );

  const handleChildChange = useCallback<NativeEventHandler>(
    (e) => {
      setRooms((prev) => {
        let newValue = Number(e.target.value);
        const newTotalGuestOfRoom = prev[idx].adult + newValue;
        const totalUnallocatedOfRoom = max - prev[idx].adult;

        if (newTotalGuestOfRoom >= max) {
          newValue = clamp(newValue, 0, totalUnallocatedOfRoom);
        }

        const offset = Number(e.target.value) - prev[idx].child;
        if (offset > unallocatedCount) {
          newValue = clamp(newValue, 0, prev[idx].child + unallocatedCount);
        }

        // not change
        if (newValue === prev[idx].child) {
          return prev;
        }

        return [
          ...prev.slice(0, idx),
          {
            ...prev[idx],
            child: newValue,
          },
          ...prev.slice(idx + 1),
        ];
      });
    },
    [unallocatedCount]
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">房間: {adult + child}人</h2>

      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">大人</h4>
          <p className="text-xs text-gray-600">年齡 20+</p>
        </div>

        <CustomInputNumber
          min={1}
          max={4}
          step={1}
          name={`room-${idx}-adult`}
          value={adult}
          disabled={disabled}
          onChange={handleAdultChange}
          onBlur={() => {}}
        />
      </div>

      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">小孩</h4>
        </div>

        <CustomInputNumber
          min={0}
          max={4}
          step={1}
          name={`room-${idx}-child`}
          value={child}
          disabled={disabled}
          onChange={handleChildChange}
          onBlur={() => {}}
        />
      </div>

      <hr />
    </div>
  );
};

export default Room;
