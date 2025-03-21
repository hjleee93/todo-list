import { ButtonProps } from "../Button"
import { ITodo } from "./Todo";

type RadioButtonProps = ButtonProps & {
  todo: ITodo
};

const RadioButton = ({className, children , todo, ...props} : RadioButtonProps) => {
  return (
    <button className="border-bold btn-shadow rounded-[27px]">
      {children}
    </button>
  )
}
export default RadioButton