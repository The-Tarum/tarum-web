import ArrowRight from "../assets/arrow-right.svg";
import React, { useState } from "react";
import { ChevronRight, Funnel, X } from "lucide-react";
import FilterDrawer from "./FilterDrawer";


const SelectedFilters = ({ selectedFilters, onRemove }) => (
  <div className="flex flex-wrap gap-2 p-2">
    {selectedFilters.map((filter, idx) => (
      <div
        key={idx}
        className="bg-gray-100 text-sm px-3 py-1 rounded-full flex items-center gap-1"
      >
        {filter.label}{" "}
        <button onClick={() => onRemove(filter)}>
          <X size={14} />
        </button>
      </div>
    ))}
  </div>
);

const Section = ({
  name,
  children,
  onHeaderClick,
  showFilterOption = false,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleApplyFilters = () => {
    // Apply filter logic here
    setShowFilters(false);
  };

  const handleResetFilters = () => {
    setSelectedFilters([]);
  };

  const handleRemoveFilter = (filterToRemove) => {
    setSelectedFilters((prev) =>
      prev.filter((f) => f.label !== filterToRemove.label)
    );
  };
  return (
    <div className="p-4 bg-white">
      {/* Filter Drawer */}
      {showFilters && (
        <FilterDrawer
          filters={{}}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
      {/* Selected Filters */}
      {selectedFilters.length > 0 && (
        <SelectedFilters
          selectedFilters={selectedFilters}
          onRemove={handleRemoveFilter}
        />
      )}
      <div
        className="flex items-center justify-between "
        onClick={onHeaderClick}
      >
        <div className="flex flex-row mb-6 items-center gap-2 cursor-pointer">
          <h2 className="text-base font-bold">{name}</h2>
          <img src={ArrowRight} alt="Right arrow" className="w-5 h-5" />
        </div>
        <div className="flex flex-row mb-6 items-center gap-2 cursor-pointer">
          {showFilterOption && (
            <button
              onClick={() => setShowFilters(true)}
            >
              <Funnel  className="" size={16} />
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Section;
