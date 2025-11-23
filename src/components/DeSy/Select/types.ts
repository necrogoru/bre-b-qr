export interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

export interface Props {
  clearable?: boolean
  disabled?: boolean
  error?: string
  id: string
  label?: string
  modelValue?: string | number
  multiple?: boolean
  onChange?: (value: string | number) => void
  options: Option[]
  required?: boolean
  placeholder?: string
  searchable?: boolean
}
