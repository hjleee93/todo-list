import Image from "next/image"
import RadioButton from "./RadioButton";

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

const Todo = ({ todoList, onStatusUpdate }: TodoProps) => {
  
  return (
    <div className="todo-section gap-5" >
      <Image src="/images/todo.png" alt="투두 아이콘 이미지" height={36} width={100} />
      {todoList.length ? todoList.map((todo) => (
        <RadioButton key={todo.id} todo={todo} onStatusUpdate={onStatusUpdate} />
      )) :
        <div className="flex flex-col items-center mt-10">
          <Image src="/images/empty_todo_large.png" alt="작성된 투두가 없습니다." height={240} width={240}
           className="hidden xs:block" />
          <Image src="/images/empty_todo_small.png" alt="작성된 투두가 없습니다." height={120} width={120} 
          className="block xs:hidden" />
          <p className="text-slate-400 text-center">할 일이 없어요.<br />TODO를 새롭게 추가해주세요!</p>
        </div>
      }
    </div>
  )

}
export default Todo