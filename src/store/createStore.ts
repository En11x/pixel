import { create } from "zustand";
import { CanvasState, initialState } from "./initialState";

interface Action{
  setWH:(w:number,h:number)=>void
}

export type Store = CanvasState & Action

export const useStore = create<Store>((set)=>({
  ...initialState,

setWH:(w, h)=> {
  set({width:w,height:h})
},
}))
