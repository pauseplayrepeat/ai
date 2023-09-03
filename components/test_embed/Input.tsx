import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <div className="input-container">
      <input className={`input-element ${className}`} ref={ref} {...props} />
    </div>
  )
})

Input.displayName = "Input"

const InputButton = React.forwardRef<HTMLInputElement, InputProps>(({ className, children, ...props }, ref) => {
  return (
    <div className="input-button-container">
      <div className="input-button-element">
        <input className={`input-button ${className}`} ref={ref} {...props} />
      </div>
      {children}
    </div>
  )
})

InputButton.displayName = "InputButton"

export { Input, InputButton }