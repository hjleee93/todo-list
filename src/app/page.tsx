'use client'
import Button from "./components/Button";
import Input from "./components/Todo/Input";
import Todo, { ITodo } from "./components/Todo/Todo";
import { useEffect, useRef, useState } from "react";
import Done from "./components/Todo/Done";
import clsx from "clsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type AddTodo = Pick<ITodo, "name">;
const API_URL = process.env.NEXT_PUBLIC_API_URL!

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [todoList, setTodoList] = useState<ITodo[]>([])
  const [doneList, setDoneList] = useState<ITodo[]>([])
  
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['todoData'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/items`)
      return res.json()
    },
  })
  
  useEffect(() => {
    if(data) {
      setTodoList(data.filter((todo: ITodo) => !todo.isCompleted))
      setDoneList(data.filter((todo: ITodo) => todo.isCompleted))
    }
  }, [data])

  if (isLoading) {
    return <p>로딩 중...</p>
  }
  
  if (isError) {
    return <p>에러가 발생했습니다</p>
  }
  
  
  const addTodo = async (body: AddTodo ) => {
    if(body.name.trim() === '') return
    const res = await fetch(`${API_URL}/items`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if(res.ok) {
      const data = await res.json()
      setTodoList(prevList => [...prevList, data]);
      inputRef.current!.value = ''
      queryClient.invalidateQueries({ queryKey: ['todoData'] })
    }

  }

  const handleAddTodo = () => {
    const name = inputRef.current?.value || ''
    addTodo({name})
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        let name = e.currentTarget.value  
        addTodo({name})
      } catch (error) {
        console.error("Error fetching:", error)
      }
    }
  }
  return (
    <div className="page-container flex-col">
      <div className="flex flex-row w-full my-3 gap-2 xs:gap-5">
        <Input className="h-[56px] w-full"
          onKeyDown={handleKeyDown}
          ref={inputRef}
         />
        <Button 
          onClick={handleAddTodo}
          iconType={todoList.length === 0 ? "plus_white" : "plus_black"}
          className={clsx(
            "flex justify-center cursor-pointer",
            todoList.length === 0 ?  "bg-violet-600 text-white" : "bg-slate-200 text-slate-900"
            )}>
            추가하기</Button>
      </div>
      <div className="pt-7 pb-5 flex flex-col md:flex-row gap-5" >
      <Todo todoList={todoList}/>
      <Done todoList={doneList}/>
      </div>
    </div>
  );
}
