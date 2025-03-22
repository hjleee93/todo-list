import clsx from "clsx";
import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

type IconType = "plus_white" | "plus_black" | "X" | "check"
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconType: IconType;
  isTextHidden?: boolean;
}

const Button = ({ className, children, iconType, isTextHidden = true, ...props }: CustomButtonProps) => {

  /**
   * 버튼 아이콘 이미지 타입에 따라 실제 사용할 아이콘 파일명을 반환하는 함수
   * @param icon 버튼 아이콘 이미지 타입
   * @returns 실제 사용할 아이콘 파일명
   */
  const getIcon = (icon: IconType) => {
    if (icon === "plus_black" || icon === "plus_white") {
      return 'plus'
    }
    return icon
  }

  return (
    <>
      <button className={clsx(
        "flex justify-center items-center rounded-3xl text-base border-bold btn-shadow cursor-pointer",
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
          <span className={clsx("xs:block", isTextHidden && "hidden")}>
          {children}
          </span>
        </div>
      </button>

    </>
  )
}
export default Button