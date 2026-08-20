"use client"

import React from "react"
import { Input } from "@heroui/input"
import { SearchIcon } from "../icons"

const PropertyFilter = ({
  filters,
  setFilters,
}: {
  filters: any
  setFilters: any
}) => {
  return (
    <div className="flex w-full max-w-sm gap-4">
      <Input
        aria-label="Search by Name or Location"
        labelPlacement="outside"
        placeholder="Search by Name or Location..."
        type="search"
        value={filters.search || ""}
        onChange={(e) =>
          setFilters((prev: any) => ({
            ...prev,
            search: e.target.value,
          }))
        }
        classNames={{
          inputWrapper: "border",
          input: "text-sm",
        }}
        startContent={
          <SearchIcon className="pointer-events-none flex-shrink-0 text-base" />
        }
        style={{
          backgroundColor: "#FFFFFF",
          color: "#373A36",
          borderColor: "#373A36",
        }}
      />
    </div>
  )
}

export default PropertyFilter
