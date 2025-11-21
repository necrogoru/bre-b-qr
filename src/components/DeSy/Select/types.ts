export interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface Props {
  options: Option[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  className?: string;
  label?: string;
  error?: string;
}
