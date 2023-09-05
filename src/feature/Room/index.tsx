import CustomInputNumber from "components/CustomInputNumber";
import React, { MutableRefObject, useCallback } from "react";

type Props = {
  guest: number;
  unallocatedCount: number;
  adult: number;
  child: number;
  idx: number;
  prevChangeRoom: MutableRefObject<number>;
};

type HTMLInputEventHandler = (
  event: Event & {
    target: HTMLInputElement;
  }
) => void;

const Room = ({
  guest,
  unallocatedCount,
  adult,
  child,
  idx,
  prevChangeRoom,
}: Props) => {
  const handleAdultChange = useCallback<HTMLInputEventHandler>((e) => {}, []);

  const handleChildChange = useCallback<HTMLInputEventHandler>((e) => {}, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">房間: {adult + child}人</h2>

      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">大人</h4>
          <p className="text-xs text-gray-600">年齡 20+</p>
        </div>

        <CustomInputNumber
          min={0}
          max={guest}
          step={1}
          name={`room-${idx}-adult`}
          value={adult}
          disabled={unallocatedCount === 0}
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
          disabled={unallocatedCount === 0}
          onChange={handleChildChange}
        />
      </div>

      <hr />
    </div>
  );
};

export default Room;
