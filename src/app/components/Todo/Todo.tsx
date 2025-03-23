import Image from "next/image"
import TodoListWrapper from "./TodoListWrapper";

export type ITodo = {
  id: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

type TodoProps = {
  todoList:ITodo[],
  onStatusUpdate: (id: string, isCompleted: boolean) => void // 상태 수정 -> 부모 전달
}

export default function Todo ({ todoList, onStatusUpdate }: TodoProps) {
  return (
    <TodoListWrapper 
      todoList={todoList}
      onStatusUpdate={onStatusUpdate} 
      titleImage="todo">
       <div className="flex flex-col items-center mt-10">
          <Image src="/images/empty_todo_large.png" alt="작성된 투두가 없습니다." height={240} width={240}
           className="hidden xs:block" />
          <Image src="/images/empty_todo_small.png" alt="작성된 투두가 없습니다." height={120} width={120} 
          className="block xs:hidden" />
          <p className="text-slate-400 text-center">할 일이 없어요.<br />TODO를 새롭게 추가해주세요!</p>
        </div>
    </TodoListWrapper>
  )

}
