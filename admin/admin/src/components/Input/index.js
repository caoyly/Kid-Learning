import React from "react"

import styles from "./styles.scss"

const Input = ({ label, name, type = "text", error, value, onChange }) => {
  return (
    <div className={`${styles.inputContainer} col-md-6`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
      />
      <div className="error">{error}</div>
    </div>
  )
}

export default Input
