import Image from "next/image"
import RadioButton from "./RadioButton";
import { ITodo } from "./Todo";


const Done = ({ todoList, onStatusUpdate }: { todoList: ITodo[], onStatusUpdate: (id: string, isCompleted: boolean) => void }) => {
  return (
    <div className="todo-section gap-5">
      <Image src="/images/done.png" alt="투두 완료 이미지" height={36} width={100} />
      {todoList.length ? todoList.map((todo) => (
        <RadioButton key={todo.id} todo={todo} onStatusUpdate={onStatusUpdate} />
      )) :
        <div className="flex flex-col items-center mt-10">
          <Image src="/images/empty_done_large.png" alt="아직 다 한 일이 없어요." height={240} width={240}
            className="hidden xs:block" />
          <Image src="/images/empty_done_small.png" alt="아직 다 한 일이 없어요." height={120} width={120}
            className="block xs:hidden" />
          <p className="text-slate-400 text-center">아직 다 한 일이 없어요.<br />
            해야 할 일을 체크해보세요!</p>
        </div>
      }
    </div>
  )
}
export default Done