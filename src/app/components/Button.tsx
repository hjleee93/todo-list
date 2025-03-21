import clsx from "clsx";
import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

type IconType = "plus_white" | "plus_black" | "X" | "check"
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconType: IconType;
}

const Button = ({ className, children, iconType,  ...props }: CustomButtonProps) => {

  const getIcon = (icon: IconType) => {
    if (icon === "plus_black" || icon === "plus_white") {
      return 'plus'
    }
    return icon
  }
  
  return (
    <>
      <button className={clsx(
        "rounded-3xl text-base border-bold btn-shadow",
        "min-w-[56px] h-[56px] xs:w-[162px]",
        className
      )}
        {...props}>
        <div className="flex items-center gap-2">
          <Image
            src={`/icons/${getIcon(iconType)}.svg`}
            alt={`${iconType} 아이콘`}
            width={16}
            height={16}
            className={iconType === "plus_black" ? "invert" : ""}
          />
          <span className="hidden xs:block ">
          {children}
          </span>
        </div>
      </button>

    </>
  )
}
export default Button