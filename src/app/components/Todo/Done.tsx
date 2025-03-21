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
      <Image src="/images/done.png" alt="투두 완료 이미지" height={36} width={100} />
      {todoList.length ? todoList.map((todo) => (
        <RadioButton key={todo.name} todo={todo} />
      )) :
        <div className="flex flex-col items-center mt-10">
          <Image src="/images/empty_done_large.png" alt="아직 다 한 일이 없어요." height={240} width={240} />
          <p className="text-slate-400 text-center">아직 다 한 일이 없어요.<br/>
          해야 할 일을 체크해보세요!</p>
        </div>
      }
    </div>
  )
}
export default Todo