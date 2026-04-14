import React, { useState } from "react";
import { Popover } from "@base-ui/react";
import { Check, MagnifyingGlass } from "@safetyculture/icons-react";
import { Input } from "../input/input";
import type { PopoverSelectProps } from "./types";

export function PopoverSelect({
  options,
  value,
  onValueChange,
  trigger,
  searchPlaceholder = "Search",
  multiple = true,
  open,
  onOpenChange,
  side = "bottom",
  align = "start",
  sideOffset = 4,
}: PopoverSelectProps) {
  const [search, setSearch] = useState("");

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  );

  function handleSelect(id: string) {
    if (multiple) {
      onValueChange(
        value.includes(id) ? value.filter((v) => v !== id) : [...value, id],
      );
    } else {
      onValueChange(value.includes(id) ? [] : [id]);
    }
  }

  return (
    <Popover.Root
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) setSearch("");
        onOpenChange?.(newOpen);
      }}
    >
      <Popover.Trigger render={trigger} />
      <Popover.Portal>
        <Popover.Positioner side={side} align={align} sideOffset={sideOffset}>
          <Popover.Popup className="bg-surface-default border border-solid border-surface-weak rounded-md shadow-md w-64 overflow-hidden outline-none">
            {/* Search */}
            <div className="p-2 border-b border-solid border-surface-weak">
              <Input
                type="search"
                size="medium"
                leftIcon={<MagnifyingGlass />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                width="full"
              />
            </div>

            {/* List */}
            <div
              role="listbox"
              aria-multiselectable={multiple || undefined}
              className="overflow-y-auto max-h-56 p-1"
            >
              {filtered.length === 0 ? (
                <div className="px-2 py-3 body-sm text-surface-weaker text-center">
                  No options found
                </div>
              ) : (
                filtered.map((option) => {
                  const selected = value.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      disabled={option.disabled}
                      className={[
                        "flex items-center gap-2 w-full rounded-xs px-2 py-1.5",
                        "body-sm text-surface-default font-[500] cursor-pointer select-none text-left",
                        "hover:bg-surface-hover transition-colors duration-120",
                        "disabled:text-surface-disabled disabled:cursor-not-allowed disabled:pointer-events-none",
                      ].join(" ")}
                      onClick={() => handleSelect(option.id)}
                    >
                      <span className="flex w-4 h-4 items-center justify-center shrink-0">
                        {selected && <Check size={12} />}
                      </span>
                      {option.label}
                    </button>
                  );
                })
              )}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

PopoverSelect.displayName = "PopoverSelect";
