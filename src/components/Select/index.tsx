import { options } from "preact"
import type { SelectHTMLAttributes } from "react"
import React from "react"
import style from './select.module.css'

export const Select: React.FC<{
  label: string
  description?: string
  disabledTitleText?: string
  name: string
  value?: string | number
  disabled?: boolean
  loading?: boolean
  onChange: SelectHTMLAttributes<HTMLSelectElement>['onChange'],
  options: { key?: string|number|null, value: string|number, label?: string|null }[]
}> = ({ label, description, disabledTitleText, name, value, disabled, onChange, options }) => {
  return (
  <label className={`${style.select} ${disabled ? style.disabled : ''} ${value ? style.hasValue : ''}`} htmlFor={name} title={disabled ? disabledTitleText : ''}>
    <span className={style.label}>{label}</span>
    <select className={style['select-element']} disabled={disabled} name={name} value={value} onChange={onChange} required>
      <option disabled selected value="">{description ?? label}</option>
      {options.map((option, index) => <option key={option.key ?? index} value={option.value}>{option.label ?? option.value}</option>)}
    </select>
  </label>
  )
}