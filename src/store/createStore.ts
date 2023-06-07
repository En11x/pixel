import { create } from 'zustand'
import { CanvasState, initialState } from './initialState'
import { produce } from 'immer'
import { Tools } from '@/types'

interface Action {
  setData: (pos: number, color: string) => void
  setTool: (tool: Tools) => void
}

export type Store = CanvasState & Action

export const useStore = create<Store>(set => ({
  ...initialState,
  setData: (pos, color) =>
    set(s => {
      s.data.set(pos, color)

      return s
    }),
  setTool: tool =>
    set(
      produce(s => {
        s.settings.tool = tool
      })
    )
}))
