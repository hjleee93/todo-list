import { createStore } from "zustand"; // 상태관리 store 생성

export interface CounterState {
  count : number
}

export interface CounterActions {
  decrement: () => void
  increment: () => void
  init: () => void
}

export type CounterStore = CounterState & CounterActions

export const createCounterStore = (initState: CounterState) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    decrement: () => set((state) => ({count : state.count - 1})),
    increment: () => set((state) =>({count : state.count + 1})),
    init: () => set(() => ({count: 0}))
  }))

}
