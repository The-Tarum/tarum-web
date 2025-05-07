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
        {filter.label}: {filter.value}
        <button onClick={() => onRemove(filter.label)} className="ml-1">
          <X size={14} />
        </button>
      </div>
    ))}
  </div>
);

const Section = ({
  name,
  children,
  onHeaderClick = null ,
  showFilterOption = false,
  onFiltersChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    selectedFilters: {},
    priceRange: [100, 500],
    qtyRange: [10, 50],
    volumeRange: [100, 200],
  });

  const [displayedFilters, setDisplayedFilters] = useState([]);

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    setShowFilters(false);

    // Convert filters to displayed format
    const newDisplayedFilters = [];
    Object.entries(filters.selectedFilters).forEach(([key, value]) => {
      if (value) {
        newDisplayedFilters.push({ label: key, value });
      }
    });

    if (filters.priceRange[0] !== 100 || filters.priceRange[1] !== 500) {
      newDisplayedFilters.push({
        label: "Price Range",
        value: `$${filters.priceRange[0]} - $${filters.priceRange[1]}`,
      });
    }

    setDisplayedFilters(newDisplayedFilters);
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  };

  const handleResetFilters = () => {
    const resetState = {
      selectedFilters: {},
      priceRange: [100, 500],
      qtyRange: [10, 50],
      volumeRange: [100, 200],
    };
    setActiveFilters(resetState);
    setDisplayedFilters([]);
    if (onFiltersChange) {
      onFiltersChange(resetState);
    }
  };

  const handleRemoveFilter = (filterLabel) => {
    const updatedFilters = { ...activeFilters };
    if (filterLabel === "Price Range") {
      updatedFilters.priceRange = [100, 500];
    } else {
      updatedFilters.selectedFilters[filterLabel] = null;
    }

    setActiveFilters(updatedFilters);
    setDisplayedFilters(
      displayedFilters.filter((f) => f.label !== filterLabel)
    );
    if (onFiltersChange) {
      onFiltersChange(updatedFilters);
    }
  };

  return (
    <div className="p-4 bg-white ">
      {showFilters && (
        <FilterDrawer
          initialFilters={activeFilters}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      <div className="flex items-center justify-between">
        <div
          className="flex flex-row  items-center gap-2 cursor-pointer"
          onClick={onHeaderClick}
        >
          <h2 className="text-base font-bold">{name}</h2>
          {onHeaderClick && (<img src={ArrowRight} alt="Right arrow" className="w-5 h-5" />)}
        </div>
        {showFilterOption && (
          <div className="flex flex-row  items-center gap-2 cursor-pointer p-1 shadow-2xl rounded-3xl bg-gray-50">
            <button onClick={() => setShowFilters(true)}>
              <Funnel className="" size={16} />
            </button>
          </div>
        )}
      </div>
      {displayedFilters.length > 0 && (
        <SelectedFilters
          selectedFilters={displayedFilters}
          onRemove={handleRemoveFilter}
        />
      )}
      <div className="pb-2"/>
      {children}
    </div>
  );
};

export default Section;
