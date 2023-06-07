import { create } from 'zustand'
import { CanvasState, initialState } from './initialState'

// interface Action{
//   setWH:(w:number,h:number)=>void
// }

export type Store = CanvasState

export const useStore = create<Store>(set => ({
  ...initialState
  // setTool:()=>set(s=>())
}))
