import React from "react"
import styles from "./styles.scss"

const Dropdown = ({ label, name, options = [], error, onChange, value }) => {
  return (
    <div className={`${styles.inputContainer} col-md-6`}>
      <label htmlFor={name}>{label}</label>
      <select
        onChange={onChange}
        id={name}
        name={name}
        className="form-control"
        value={value}
      >
        {options.map((item, index) => {
          const value = item.value || item.label || item
          const label = item.label || item

          return (
            <option key={index} value={value} selected={item.selected}>
              {label}
            </option>
          )
        })}
      </select>
      <div className="error">{error}</div>
    </div>
  )
}

export default Dropdown
