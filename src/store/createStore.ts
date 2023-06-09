import { create } from 'zustand'
import { CanvasState, initialState } from './initialState'
import { produce } from 'immer'
import { deepCopyMap } from '@/utils'
import { Tools } from '@/types'

interface Action {
  setData: (pos: number, color: string) => void
  delData: (pos: number) => void
  setTool: (tool: Tools) => void
  setToolSize: (size: number) => void
  setPencelRightClickEraser: (r: boolean) => void
}

export type Store = CanvasState & Action

export const useStore = create<Store>(set => ({
  ...initialState,
  setData: (pos, color) =>
    set(s => {
      const copy = deepCopyMap<number, string>(s.data)
      copy.set(pos, color)
      return { ...s, data: copy }
    }),
  delData: pos =>
    set(s => {
      const copy = deepCopyMap<number, string>(s.data)
      copy.has(pos) && copy.delete(pos)

      return { ...s, data: copy }
    }),
  setTool: tool =>
    set(
      produce(s => {
        s.tool.current = tool
      })
    ),
  setToolSize: size =>
    set(
      produce(s => {
        s.tool.size = size
      })
    ),
  setPencelRightClickEraser: r =>
    set(
      produce(s => {
        s.tool[Tools.PENCEL].rightClickEraser = r
      })
    )
}))
