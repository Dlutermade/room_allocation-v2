import CustomInputNumber from "components/CustomInputNumber";
import { RoomData } from "feature/RoomAllocation";
import React, { SetStateAction, Dispatch, useCallback } from "react";
import { clamp } from "utils/number";

type Props = {
  guest: number;
  unallocatedCount: number;
  max: number;
  adult: number;
  child: number;
  idx: number;
  disabled: boolean;
  setRoomsChange: Dispatch<SetStateAction<RoomData[]>>;
};

type HTMLInputEventHandler = (
  event: Event & {
    target: HTMLInputElement;
  }
) => void;

const Room = ({
  guest,
  unallocatedCount,
  max,
  adult,
  child,
  idx,
  disabled,
  setRoomsChange,
}: Props) => {
  const handleAdultChange = useCallback<HTMLInputEventHandler>(
    (e) => {
      setRoomsChange((prev) => {
        const newTotalGuestOfRoom = Number(e.target.value) + prev[idx].child;
        const totalUnallocatedOfRoom = max - prev[idx].child;

        if (newTotalGuestOfRoom >= max) {
          const newValue = Number(e.target.value);

          e.target.value = clamp(
            newValue,
            1,
            totalUnallocatedOfRoom
          ).toString();
        }

        const offset = Number(e.target.value) - prev[idx].adult;
        if (offset > unallocatedCount) {
          const newValue = Number(e.target.value);

          e.target.value = clamp(
            newValue,
            1,
            prev[idx].adult + unallocatedCount
          ).toString();
        }

        // not change
        if (Number(e.target.value) === prev[idx].adult) {
          return prev;
        }

        return [
          ...prev.slice(0, idx),
          {
            ...prev[idx],
            adult: Number(e.target.value),
          },
          ...prev.slice(idx + 1),
        ];
      });
    },
    [unallocatedCount]
  );

  const handleChildChange = useCallback<HTMLInputEventHandler>(
    (e) => {
      setRoomsChange((prev) => {
        const newTotalGuestOfRoom = prev[idx].adult + Number(e.target.value);
        const totalUnallocatedOfRoom = max - prev[idx].adult;

        if (newTotalGuestOfRoom >= max) {
          const newValue = Number(e.target.value);

          e.target.value = clamp(
            newValue,
            0,
            totalUnallocatedOfRoom
          ).toString();
        }

        const offset = Number(e.target.value) - prev[idx].child;
        if (offset > unallocatedCount) {
          const newValue = Number(e.target.value);

          e.target.value = clamp(
            newValue,
            0,
            prev[idx].child + unallocatedCount
          ).toString();
        }

        // not change
        if (Number(e.target.value) === prev[idx].child) {
          return prev;
        }

        return [
          ...prev.slice(0, idx),
          {
            ...prev[idx],
            child: Number(e.target.value),
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
          max={guest}
          step={1}
          name={`room-${idx}-adult`}
          value={adult}
          disabled={disabled}
          onChange={handleAdultChange}
        />
      </div>

      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">小孩</h4>
        </div>

        <CustomInputNumber
          min={0}
          max={guest}
          step={1}
          name={`room-${idx}-child`}
          value={child}
          disabled={disabled}
          onChange={handleChildChange}
        />
      </div>

      <hr />
    </div>
  );
};

export default Room;
