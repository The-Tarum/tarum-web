/* src/components/FilterDrawer.jsx */

"use client"

import React, { useState, useEffect } from "react"
import { X, ChevronDown } from "lucide-react"
import * as Collapsible from "@radix-ui/react-collapsible"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import RangeSlider from "./RangeSlider"

const filterOptions = {
  "Region": ["NJ"],
  "Delivery Terms": ["Delivered"],
  "Payment": ["Cash"],
  "Grade": ["Food"],
  "Product Origin": ["Germany"],
  "Mesh": ["30 to 100"],
  "Packaging": ["Any"],
}

export default function FilterDrawer({
  open,
  onOpenChange,
  onApply,
  onReset,
  initialFilters = {},
}) {
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange || [100, 500])
  const [qtyRange, setQtyRange] = useState(initialFilters.qtyRange || [10, 50])
  const [volumeRange, setVolumeRange] = useState(initialFilters.volumeRange || [100, 200])
  const [selectedFilters, setSelectedFilters] = useState(
    initialFilters.selectedFilters ||
      Object.fromEntries(Object.keys(filterOptions).map((k) => [k, null]))
  )

  useEffect(() => {
    if (initialFilters.selectedFilters) setSelectedFilters(initialFilters.selectedFilters)
    if (initialFilters.priceRange) setPriceRange(initialFilters.priceRange)
    if (initialFilters.qtyRange) setQtyRange(initialFilters.qtyRange)
    if (initialFilters.volumeRange) setVolumeRange(initialFilters.volumeRange)
  }, [initialFilters])

  const handleApply = () => {
    onApply({ selectedFilters, priceRange, qtyRange, volumeRange })
    onOpenChange(false)
  }

  const handleReset = () => {
    const reset = Object.fromEntries(
      Object.keys(filterOptions).map((k) => [k, null])
    )
    setSelectedFilters(reset)
    setPriceRange([100, 500])
    setQtyRange([10, 50])
    setVolumeRange([100, 200])
    onReset()
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[70vh] flex flex-col rounded-t-2xl">
        {/* Header */}
        <DrawerHeader>
          <div className="flex justify-between items-center">
            <div>
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>
                Choose your search filters and then click “Apply”
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button size="icon" variant="ghost">
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {Object.keys(filterOptions).map((label) => (
            <Collapsible.Root key={label} className="border rounded-lg border-gray-300">
              <Collapsible.Trigger className="group w-full px-4 py-3 flex justify-between items-center text-sm hover:bg-gray-50 transition-colors">
                <span className="font-medium">{label}</span>
                <div className="flex items-center gap-2">
                  {selectedFilters[label] && (
                    <span className="text-gray-500 font-normal">{selectedFilters[label]}</span>
                  )}
                  <ChevronDown className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform text-gray-400" />
                </div>
              </Collapsible.Trigger>
              <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <div className="px-4 pb-3 pt-1 space-y-2">
                  {filterOptions[label].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedFilters((prev) => ({ ...prev, [label]: option }))}
                      className={`w-full text-left p-2 text-sm rounded-md ${
                        selectedFilters[label] === option ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          ))}

          <RangeSlider label="Price/kg" min={100} max={10000} value={priceRange} onChange={setPriceRange} />
          <RangeSlider label="Quantities (kg)" min={100} max={10000} value={qtyRange} onChange={setQtyRange} />
          <RangeSlider label="Annual seller product volume (mt)" min={100} max={10000} value={volumeRange} onChange={setVolumeRange} />
        </div>

        {/* Footer */}
        <DrawerFooter className="flex-shrink-0  flex-row bg-white border-t p-4 flex gap-2">

          <Button variant="outline" onClick={handleReset} className="flex-1">
            Clear All
          </Button>
          <Button onClick={handleApply} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white">
            Apply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
