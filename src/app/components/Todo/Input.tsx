import clsx from "clsx"
import { forwardRef, InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref: React.RefObject<HTMLInputElement>
}

const Input = forwardRef<HTMLInputElement, InputProps>(({className, ...props}, ref) => {
  return (
      <input
      ref={ref}
       className={clsx(
        "rounded-3xl border-bold btn-shadow",
        "px-5 focus-visible:outline-none",
        className)} placeholder="할 일을 입력해주세요" {...props}/>
  )
})
export default Input