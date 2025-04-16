import * as SliderPrimitive from "@radix-ui/react-slider";

export interface SliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  hintText?: string;
  isDisplayLabel?: boolean;
  isRequired?: boolean;
  label: string;
  showTooltip?: boolean;
  tooltipContent?: (value: number) => React.ReactNode;
}
