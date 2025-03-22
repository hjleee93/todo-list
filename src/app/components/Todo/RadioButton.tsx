'use client'

import Image from "next/image";
import { ButtonProps } from "../Button"
import { ITodo } from "./Todo";
import { useEffect, useMemo, useState, forwardRef } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { twMerge } from 'tailwind-merge'

type RadioButtonProps = ButtonProps & {
  classNames?: {
    wrapper?: string,
    inputContainer?: string,
  }
  todo: ITodo,
  isEditing?: boolean // 수정 모드 여부
  onNameUpdate?: (name: string) => void // 이름 수정 시 호출
};

const API_URL = process.env.NEXT_PUBLIC_API_URL!

/**
 * 할 일 버튼 컴포넌트
 * @param classNames 클래스 이름
 * @param children 자식 요소
 * @param todo 할 일 데이터
 * @param isEditing 수정 모드 여부
 * @param props 기타 속성
 * @returns 
 */
const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(({classNames, children, todo, isEditing = false, onNameUpdate, ...props}, ref) => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted)
  const [name, setName] = useState(todo.name)

  const router = useRouter()

  useEffect(() => {
    setIsCompleted(todo.isCompleted)
  
  }, [todo.isCompleted])

  const handleTodoStatus = async () => {
    const res = await fetch(`${API_URL}/items/${todo.id}`, {
    method:'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isCompleted: !isCompleted
      }),
    })
    if(res.ok) {
      setIsCompleted(!isCompleted)
    }
  }
  
  const handleTodoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'IMG') { //체크 항목 클릭시 페이지 이동 방지
      event.stopPropagation();
      return;
    }
    router.push(`/items/${todo.id}`)
  }

  
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value); 
  };


  return (
    <button 
      className={clsx(
        twMerge("border-bold rounded-[27px] h-[50px] px-2 cursor-pointer", classNames?.wrapper),
        isCompleted && "bg-violet-100"
      )}
      onClick={(e)=>handleTodoClick(e)}
    >
      <div className={clsx( 
        "flex flex-row items-center gap-2 w-full",
        classNames?.inputContainer
      )}>
        <Image src={`/icons/${isCompleted ? 'check_round' :'default'}.svg`} alt="기본 이미지" width={32} height={32}
          className="cursor-pointer"
          onClick={handleTodoStatus} />
        {isEditing ? (
          <input 
            ref={ref}
            type="text" 
            onChange={(e)=>handleNameChange(e)}
            value={name}
            className="underline max-w-full break-words text-center focus-visible:outline-none"
          />
        ) : (
          <span className={isCompleted ? "line-through" : ""}>{todo.name}</span>
        )}
      </div>
    </button>
  );
});

export default RadioButton
