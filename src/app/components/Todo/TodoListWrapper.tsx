import Image from "next/image"
import RadioButton from "./RadioButton";

export type ITodo = {
  id: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

type TodoListWrapperProps = {
  todoList:ITodo[],
  children: React.ReactNode,
  titleImage: string,
  onStatusUpdate: (id: string, isCompleted: boolean) => void // 상태 수정 -> 부모 전달
}

/**
 * 할 일 목록 래퍼 - done, todo 공통 컴포넌트
 * @param todoList 할 일 목록
 * @param onStatusUpdate 할 일 상태 업데이트
 * @param children 자식 요소
 * @param titleImage 타이틀 이미지
 * @returns 
 */
export default function TodoListWrapper({ todoList, onStatusUpdate, children, titleImage }: TodoListWrapperProps) {
  
  return (
    <div className="todo-section gap-5" >
      <Image src={`/images/${titleImage}.png`} alt={titleImage} height={36} width={100} />
      {todoList.length ? todoList.map((todo) => (
        <RadioButton key={todo.id} todo={todo} onStatusUpdate={onStatusUpdate} />
      )) :
      <>
      {children}
      </>
      }
    </div>
  )

}