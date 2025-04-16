"use client";

import { Command as CommandPrimitive, useCommandState } from "cmdk";
import * as React from "react";
import { forwardRef, useEffect } from "react";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@components/ui/command";
import { cn } from "@/lib/utils";
import { useDebounce } from "@hooks/useDebounce";
import { X } from "lucide-react";
import { Label } from "../../../components/ui/label";
import {
  GroupOption,
  MultipleSelectorProps,
  MultipleSelectorRef,
  Option,
} from "./MultipleSelector.types";
import {
  isOptionsExist,
  removePickedOption,
  transToGroupOption,
} from "./helpers";

/**
 * The `CommandEmpty` of shadcn/ui will cause the cmdk empty not rendering correctly.
 * So we create one and copy the `Empty` implementation from `cmdk`.
 *
 * @reference: https://github.com/hsuanyi-chou/shadcn-ui-expansions/issues/34#issuecomment-1949561607
 **/
const CommandEmpty = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CommandPrimitive.Empty>
>(({ className, ...props }, forwardedRef) => {
  const render = useCommandState((state) => state.filtered.count === 0);

  if (!render) return null;

  return (
    <div
      ref={forwardedRef}
      className={cn("px-2 py-4 text-center text-sm", className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  );
});

CommandEmpty.displayName = "CommandEmpty";

export const MultipleSelector = React.forwardRef<
  MultipleSelectorRef,
  MultipleSelectorProps
>(
  (
    {
      label,
      hintText,
      helperText,
      isDisplayLabel,
      isRequired,
      value,
      onChange,
      placeholder,
      defaultOptions: arrayDefaultOptions = [],
      options: arrayOptions,
      delay,
      onSearch,
      onSearchSync,
      loadingIndicator,
      emptyIndicator,
      maxSelected = Number.MAX_SAFE_INTEGER,
      onMaxSelected,
      hidePlaceholderWhenSelected,
      disabled,
      groupBy,
      className,
      badgeClassName,
      selectFirstItem = true,
      creatable = false,
      triggerSearchOnFocus = false,
      commandProps,
      inputProps,
      hideClearAllButton = false,
    }: MultipleSelectorProps,
    ref: React.Ref<MultipleSelectorRef>
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [onScrollbar, setOnScrollbar] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null); // Added this

    const [selected, setSelected] = React.useState<Option[]>(value || []);
    const [options, setOptions] = React.useState<GroupOption>(
      transToGroupOption(arrayDefaultOptions, groupBy)
    );
    const [inputValue, setInputValue] = React.useState("");
    const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

    React.useImperativeHandle(
      ref,
      () => ({
        selectedValue: [...selected],
        input: inputRef.current as HTMLInputElement,
        focus: () => inputRef?.current?.focus(),
        reset: () => setSelected([]),
      }),
      [selected]
    );

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        inputRef.current.blur();
      }
    };

    const handleUnselect = React.useCallback(
      (option: Option) => {
        const newOptions = selected.filter((s) => s.value !== option.value);
        setSelected(newOptions);
        onChange?.(newOptions);
      },
      [onChange, selected]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (input.value === "" && selected.length > 0) {
              const lastSelectOption = selected[selected.length - 1];
              // If last item is fixed, we should not remove it.
              if (lastSelectOption && !lastSelectOption.fixed) {
                handleUnselect(lastSelectOption);
              }
            }
          }
          // This is not a default behavior of the <input /> field
          if (e.key === "Escape") {
            input.blur();
          }
        }
      },
      [handleUnselect, selected]
    );

    useEffect(() => {
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchend", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchend", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchend", handleClickOutside);
      };
    }, [open]);

    useEffect(() => {
      if (value) {
        setSelected(value);
      }
    }, [value]);

    useEffect(() => {
      /** If `onSearch` is provided, do not trigger options updated. */
      if (!arrayOptions || onSearch) {
        return;
      }
      const newOption = transToGroupOption(arrayOptions || [], groupBy);
      if (JSON.stringify(newOption) !== JSON.stringify(options)) {
        setOptions(newOption);
      }
    }, [arrayDefaultOptions, arrayOptions, groupBy, onSearch, options]);

    useEffect(() => {
      /** sync search */

      const doSearchSync = () => {
        const res = onSearchSync?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
      };

      const exec = async () => {
        if (!onSearchSync || !open) return;

        if (triggerSearchOnFocus) {
          doSearchSync();
        }

        if (debouncedSearchTerm) {
          doSearchSync();
        }
      };

      void exec();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

    useEffect(() => {
      /** async search */

      const doSearch = async () => {
        setIsLoading(true);
        const res = await onSearch?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
        setIsLoading(false);
      };

      const exec = async () => {
        if (!onSearch || !open) return;

        if (triggerSearchOnFocus) {
          await doSearch();
        }

        if (debouncedSearchTerm) {
          await doSearch();
        }
      };

      void exec();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

    const CreatableItem = () => {
      if (!creatable) return undefined;
      if (
        isOptionsExist(options, [{ value: inputValue, label: inputValue }]) ||
        selected.find((s) => s.value === inputValue)
      ) {
        return undefined;
      }

      const Item = (
        <CommandItem
          value={inputValue}
          className="cursor-pointe mx-1 mb-1"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onSelect={(value: string) => {
            if (selected.length >= maxSelected) {
              onMaxSelected?.(selected.length);
              return;
            }
            setInputValue("");
            const newOptions = [...selected, { value, label: value }];
            setSelected(newOptions);
            onChange?.(newOptions);
          }}
        >
          {`Create "${inputValue}"`}
        </CommandItem>
      );

      // For normal creatable
      if (!onSearch && inputValue.length > 0) {
        return Item;
      }

      // For async search creatable. avoid showing creatable item before loading at first.
      if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
        return Item;
      }

      return undefined;
    };

    const EmptyItem = React.useCallback(() => {
      if (!emptyIndicator) return undefined;

      // For async search that showing emptyIndicator
      if (onSearch && !creatable && Object.keys(options).length === 0) {
        return (
          <CommandItem value="-" disabled>
            {emptyIndicator}
          </CommandItem>
        );
      }

      return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
    }, [creatable, emptyIndicator, onSearch, options]);

    const selectables = React.useMemo<GroupOption>(
      () => removePickedOption(options, selected),
      [options, selected]
    );

    /** Avoid Creatable Selector freezing or lagging when paste a long string. */
    const commandFilter = React.useCallback(() => {
      if (commandProps?.filter) {
        return commandProps.filter;
      }

      if (creatable) {
        return (value: string, search: string) => {
          return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
        };
      }
      // Using default filter in `cmdk`. We don&lsquo;t have to provide it.
      return undefined;
    }, [creatable, commandProps?.filter]);

    return (
      <div className="space-y-2 min-w-[300px]">
        {isDisplayLabel && (
          <div className="mb-2 flex items-center justify-between gap-1">
            <Label htmlFor="terms">
              {label}
              {isRequired && <span className="text-destructive">*</span>}
            </Label>
            {hintText && (
              <span className="text-sm text-muted-foreground">{hintText}</span>
            )}
          </div>
        )}
        <Command
          ref={dropdownRef}
          {...commandProps}
          onKeyDown={(e) => {
            handleKeyDown(e);
            commandProps?.onKeyDown?.(e);
          }}
          className={cn(
            "h-auto overflow-visible bg-transparent",
            commandProps?.className
          )}
          shouldFilter={
            commandProps?.shouldFilter !== undefined
              ? commandProps.shouldFilter
              : !onSearch
          } // When onSearch is provided, we don&lsquo;t want to filter the options. You can still override it.
          filter={commandFilter()}
        >
          <div
            className={cn(
              "relative min-h-[38px] rounded-sm border border-input text-sm transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
              {
                "p-1": selected.length !== 0,
                "cursor-text": !disabled && selected.length !== 0,
              },
              !hideClearAllButton && "pe-9",
              className
            )}
            onClick={() => {
              if (disabled) return;
              inputRef?.current?.focus();
            }}
          >
            <div className="flex flex-wrap gap-1">
              {selected.map((option) => {
                return (
                  <div
                    key={option.value}
                    className={cn(
                      "animate-fadeIn relative inline-flex h-7 cursor-default items-center rounded-md border border-solid bg-background pe-7 pl-2 ps-2 text-xs font-medium text-secondary-foreground transition-all hover:bg-background disabled:cursor-not-allowed disabled:opacity-50 data-[fixed]:pe-2",
                      badgeClassName
                    )}
                    data-fixed={option.fixed}
                    data-disabled={disabled || undefined}
                  >
                    {option.label}
                    <button
                      className="absolute -inset-y-px -end-px flex size-7 items-center justify-center rounded-e-lg border border-transparent p-0 text-muted-foreground/80 outline-0 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(option);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => handleUnselect(option)}
                      aria-label="Remove"
                    >
                      <X
                        width={14}
                        height={14}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                );
              })}
              {/* Avoid having the "Search" Icon */}
              <CommandPrimitive.Input
                {...inputProps}
                ref={inputRef}
                value={inputValue}
                disabled={disabled}
                onValueChange={(value) => {
                  setInputValue(value);
                  inputProps?.onValueChange?.(value);
                }}
                onBlur={(event) => {
                  if (!onScrollbar) {
                    setOpen(false);
                  }
                  inputProps?.onBlur?.(event);
                }}
                onFocus={(event) => {
                  setOpen(true);
                  if (triggerSearchOnFocus) {
                    onSearch?.(debouncedSearchTerm);
                  }
                  inputProps?.onFocus?.(event);
                }}
                placeholder={
                  hidePlaceholderWhenSelected && selected.length !== 0
                    ? ""
                    : placeholder
                }
                className={cn(
                  "flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
                  {
                    "w-full": hidePlaceholderWhenSelected,
                    "px-3 py-2": selected.length === 0,
                    "ml-1": selected.length !== 0,
                  },
                  inputProps?.className
                )}
              />
              <button
                type="button"
                onClick={() => {
                  setSelected(selected.filter((s) => s.fixed));
                  onChange?.(selected.filter((s) => s.fixed));
                }}
                className={cn(
                  "absolute end-0 top-0 flex size-9 items-center justify-center rounded-lg border border-transparent text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70",
                  (hideClearAllButton ||
                    disabled ||
                    selected.length < 1 ||
                    selected.filter((s) => s.fixed).length ===
                      selected.length) &&
                    "hidden"
                )}
                aria-label="Clear all"
              >
                <X width={16} height={16} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="relative">
            <div
              className={cn(
                "absolute top-2 z-10 w-full overflow-hidden rounded-lg border border-input",
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                !open && "hidden"
              )}
              data-state={open ? "open" : "closed"}
            >
              {open && (
                <CommandList
                  className="bg-popover text-popover-foreground shadow-lg shadow-black/5 outline-none"
                  onMouseLeave={() => {
                    setOnScrollbar(false);
                  }}
                  onMouseEnter={() => {
                    setOnScrollbar(true);
                  }}
                  onMouseUp={() => {
                    inputRef?.current?.focus();
                  }}
                >
                  {isLoading ? (
                    <>{loadingIndicator}</>
                  ) : (
                    <>
                      {EmptyItem()}
                      {CreatableItem()}
                      {!selectFirstItem && (
                        <CommandItem value="-" className="hidden" />
                      )}
                      {Object.entries(selectables).map(([key, dropdowns]) => (
                        <CommandGroup
                          key={key}
                          heading={key}
                          className="h-full overflow-auto"
                        >
                          <>
                            {dropdowns.map((option) => {
                              return (
                                <CommandItem
                                  key={option.value}
                                  value={option.value}
                                  disabled={option.disable}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  onSelect={() => {
                                    if (selected.length >= maxSelected) {
                                      onMaxSelected?.(selected.length);
                                      return;
                                    }
                                    setInputValue("");
                                    const newOptions = [...selected, option];
                                    setSelected(newOptions);
                                    onChange?.(newOptions);
                                  }}
                                  className={cn(
                                    "cursor-pointer",
                                    option.disable &&
                                      "cursor-not-allowed opacity-50"
                                  )}
                                >
                                  {option.label}
                                </CommandItem>
                              );
                            })}
                          </>
                        </CommandGroup>
                      ))}
                    </>
                  )}
                </CommandList>
              )}
            </div>
          </div>
        </Command>
        {helperText && (
          <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

MultipleSelector.displayName = "MultipleSelector";
export default MultipleSelector;
