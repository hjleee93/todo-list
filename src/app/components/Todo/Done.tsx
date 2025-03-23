import Image from "next/image"
import { ITodo } from "./Todo";
import TodoListWrapper from "./TodoListWrapper";


export default function Done ({ todoList, onStatusUpdate }: { todoList: ITodo[], onStatusUpdate: (id: string, isCompleted: boolean) => void }) {
  return (
    <TodoListWrapper
      todoList={todoList}
      onStatusUpdate={onStatusUpdate}
      titleImage="done">
      <div className="flex flex-col items-center mt-10">
        <Image src="/images/empty_done_large.png" alt="아직 다 한 일이 없어요." height={240} width={240}
            className="hidden xs:block" />
          <Image src="/images/empty_done_small.png" alt="아직 다 한 일이 없어요." height={120} width={120}
            className="block xs:hidden" />
          <p className="text-slate-400 text-center">아직 다 한 일이 없어요.<br />
            해야 할 일을 체크해보세요!</p>
        </div>
    </TodoListWrapper>
  )
}