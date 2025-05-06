import React from "react";
import * as Slider from "@radix-ui/react-slider";

const RangeSlider = ({ label, min, max, value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block font-medium text-sm">{label}</label>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{value[0]}</span>
        <span>{value[1]}</span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        min={min}
        max={max}
        step={1}
        value={value}
        onValueChange={onChange}
      >
        <Slider.Track className="bg-gray-300 relative grow rounded-full h-1">
          <Slider.Range className="absolute bg-gray-800 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 bg-white border border-gray-300 rounded-full shadow" />
        <Slider.Thumb className="block w-4 h-4 bg-white border border-gray-300 rounded-full shadow" />
      </Slider.Root>
    </div>
  );
};

export default RangeSlider;
