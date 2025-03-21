import Image from "next/image"
import RadioButton from "./RadioButton";

export interface ITodo {
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

const Todo = ({ todoList }: { todoList: ITodo[] }) => {
  return (
    <div className="todo-section gap-5">
      <Image src="/images/todo.png" alt="투두 아이콘 이미지" height={36} width={100} />
      {todoList.length ? todoList.map((todo) => (
        <RadioButton key={todo.name} todo={todo} />
      )) :
        <div className="flex flex-col items-center mt-10">
          <Image src="/images/empty_todo.png" alt="작성된 투두가 없습니다." height={240} width={240} />
          <p className="text-slate-400 text-center">할 일이 없어요.<br/>TODO를 새롭게 추가해주세요!</p>
        </div>
      }
    </div>
  )
}
export default Todo