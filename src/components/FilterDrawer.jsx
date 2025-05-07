import React, { useState } from "react";
import { X } from "lucide-react";
import RangeSlider from "./RangeSlider";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

const filterOptions = {
  "Region": ["NJ"],
  "Delivery Terms": ["Delivered"],
  "Payment": ["Cash"],
  "Grade": ["Food"],
  "Product Origin": ["Germany"],
  "Mesh": ["30 to 100"],
  "Packaging": ["Any"]
};

const FilterDrawer = ({ onClose, onApply, onReset }) => {
  const [priceRange, setPriceRange] = useState([100, 500]);
  const [qtyRange, setQtyRange] = useState([10, 50]);
  const [volumeRange, setVolumeRange] = useState([100, 200]);
  const [selectedFilters, setSelectedFilters] = useState({
    "Region": null,
    "Delivery Terms": null,
    "Payment": null,
    "Grade": null,
    "Product Origin": null,
    "Mesh": null,
    "Packaging": null
  });

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-500 max-h-[90vh] overflow-y-auto pb-[50px]">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-400">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((label) => (
          <Collapsible.Root key={label} className="border rounded-lg border-gray-400">
            <Collapsible.Trigger className="group w-full px-4 py-3 flex justify-between items-center text-sm hover:bg-gray-50 transition-colors ">
              <div className="flex items-center">
                <span className="font-medium">{label}</span>
            
              </div>

              <div className="flex flex-row items-center border-start">
              {selectedFilters[label] && (
                  <span className="ml-2 text-gray-500 font-normal">
                    {selectedFilters[label]}
                  </span>
                )}
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180 text-gray-400" />
              </div>
       
            </Collapsible.Trigger>

            <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
              <div className="px-4 pb-3 pt-1 space-y-2">
                {filterOptions[label].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedFilters(prev => ({...prev, [label]: option}))}
                    className="w-full text-left p-2 text-sm hover:bg-gray-100 rounded-md"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        ))}

        {/* Sliders */}
        <RangeSlider
          label="Price/kg"
          min={100}
          max={500}
          value={priceRange}
          onChange={setPriceRange}
        />

        <RangeSlider
          label="Quantities (kg)"
          min={10}
          max={50}
          value={qtyRange}
          onChange={setQtyRange}
        />

        <RangeSlider
          label="Annual seller product volume (mt)"
          min={100}
          max={200}
          value={volumeRange}
          onChange={setVolumeRange}
        />
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white  border-gray-400 p-4 flex justify-between gap-2 ">
        <button
          onClick={() => {
            setSelectedFilters({
              "Region": null,
              "Delivery Terms": null,
              // ... reset all other filters
            });
            onReset();
          }}
          className="flex-1 border border-gray-300 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-50"
        >
          Clear All
        </button>
        <button
          onClick={onApply}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterDrawer;