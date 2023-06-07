import { create } from 'zustand'
import { CanvasState, initialState } from './initialState'
import { produce } from 'immer'
import { Tools } from '@/types'

interface Action {
  setTool: (tool: Tools) => void
}

export type Store = CanvasState & Action

export const useStore = create<Store>(set => ({
  ...initialState,
  setTool: tool =>
    set(
      produce(s => {
        s.currentTool = tool
      })
    )
}))
