'use client'
import Button from "./components/Button";
import Image from "next/image";
import Input from "./components/Todo/Input";
import Todo, { ITodo } from "./components/Todo/Todo";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import Done from "./components/Todo/Done";
import clsx from "clsx";

type AddTodo = Pick<ITodo, "name">;
const API_URL = process.env.NEXT_PUBLIC_API_URL!

export default function Home() {
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  useEffect(() => {
    getTodos()
  },[])
  
  
  const addTodo = async (body: AddTodo ) => {
    
    const res = await fetch(`${API_URL}/items`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    console.log(res)

  }

  const handleAddTodo = () => {
    
  }

  const getTodos = async () => {
    const res = await fetch(`${API_URL}/items`);
    const todos: ITodo[] = await res.json();
    setTodoList(todos)
  
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        console.log(e.currentTarget.value)
        let name = e.currentTarget.value  
        addTodo({name})
        // const response = await fetch(`/api/search?query=${value}`)
        // const data = await response.json()
        // console.log(data)
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
         />
        <Button 
          onClick={handleAddTodo}
          iconType={todoList.length === 0 ? "plus_white" : "plus_black"}
          className={clsx(
            "flex justify-center",
            todoList.length === 0 ?  "bg-violet-600 text-white" : "bg-slate-200 text-slate-900"
            )}>
            추가하기</Button>
      </div>
      <div className="pt-7 pb-5 flex flex-col md:flex-row">
      <Todo todoList={todoList} />
      <Done todoList={todoList} />
      </div>
    </div>
  );
}
