import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import clsx from "clsx";
import { TriangleAlert } from "lucide-react";
import { FormInputProps } from "./FormInput.types";

export const FormInput: React.FC<FormInputProps> = (props) => {
  return (
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
      <div className="relative">
        <Input
          {...props}
          className={clsx(
            "focus-visible:ring-1",
            "focus-visible:ring-offset-0",
            "peer",
            props.startIcon && "ps-10",
            props.endIcon && "pe-15",
            props.className,
            (props.disabled || props.readOnly) &&
              "cursor-not-allowed opacity-50 text-muted-background",
            props.isError && "border-destructive focus-visible:ring-destructive"
          )}
        />
        {props.startIcon && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            {props.startIcon}
          </div>
        )}
        {props.endIcon && (
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
            {props.endIcon}
          </div>
        )}
      </div>
      {props.isError && props.errorMessage && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <TriangleAlert size={14} />
          {props.errorMessage}
        </p>
      )}
      {!props.isError && props.helperText && (
        <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
          {props.helperText}
        </p>
      )}
    </div>
  );
};
