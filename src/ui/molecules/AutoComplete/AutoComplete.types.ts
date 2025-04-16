export interface AutoCompleteProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  hintText?: string;
  isDisplayLabel?: boolean;
  isRequired?: boolean;
  helperText?: string;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
