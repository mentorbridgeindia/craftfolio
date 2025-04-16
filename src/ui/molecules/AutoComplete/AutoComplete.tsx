"use client";

import { Check, ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

import { Button } from "@components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@components/ui/command";
import { Label } from "@components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { cn } from "@/lib/utils";
import { AutoCompleteProps } from "./AutoComplete.types";

export function AutoComplete(props: AutoCompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const getIcon = () => {
    if (props.endIcon) {
      return props.endIcon;
    }
    if (open) {
      return <ChevronUp size={16} strokeWidth={2} aria-hidden="true" />;
    }
    return <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="space-y-2 min-w-[300px]">
        {props.isDisplayLabel && (
          <div className="mb-2 flex items-center justify-between gap-1">
            <Label htmlFor="terms">
              {props.label}
              {props.isRequired && <span className="text-destructive">*</span>}
            </Label>
            {props.hintText && (
              <span className="text-sm text-muted-foreground">
                {props.hintText}
              </span>
            )}
          </div>
        )}
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            disabled={props.disabled}
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {props.startIcon}
            {value
              ? props.options.find((option) => option.value === value)?.label
              : "Select framework..."}
            {getIcon()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={props.placeholder} className="h-9" />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {props.options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        {props.helperText && (
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {props.helperText}
          </p>
        )}
      </div>
    </Popover>
  );
}
