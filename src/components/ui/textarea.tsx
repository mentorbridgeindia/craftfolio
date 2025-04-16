import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  endIcon,
  helperText,
  isError,
  ...props
}: React.ComponentProps<"textarea"> & {
  endIcon?: React.ReactNode;
  helperText?: string;
  isError?: boolean;
}) {
  return (
    <div className="relative">
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
          className,
          endIcon && "pe-15"
        )}
        {...props}
      />
      {endIcon && (
        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-end mb-10 justify-center pe-5 text-muted-foreground/80 peer-disabled:opacity-50">
          {endIcon}
        </div>
      )}
      {!isError && helperText && (
        <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
          {helperText}
        </p>
      )}
    </div>
  );
}

export { Textarea };
