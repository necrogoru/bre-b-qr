export interface Phone {
  numberWithCode?: string
  code?: string
}

export interface Props {
  disabled?: boolean
  error?: string
  id: string
  label?: string
  modelValue?: string
  required?: boolean
  success?: boolean
  hideError?: boolean
}
