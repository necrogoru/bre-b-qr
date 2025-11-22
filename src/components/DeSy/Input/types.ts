export interface Props {
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  label?: string
  id: string
  error?: string
  helperText?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'outlined' | 'filled' | 'standard'
  prefix?: string
  suffix?: string
}

export interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

export interface InputSlots {
  prefix?: () => any
  suffix?: () => any
}
