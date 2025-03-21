import clsx from "clsx"
import { InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = ({className, ...props} : InputProps) => {
  return (
      <input className={clsx(
        "rounded-3xl border-bold btn-shadow",
        "px-5 focus-visible:outline-none",
        className)} placeholder="할 일을 입력해주세요" {...props}/>
  )
}
export default Input