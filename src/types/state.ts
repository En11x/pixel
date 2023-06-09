import { Dispatch, SetStateAction } from 'react'

export type SetState<S> = Dispatch<SetStateAction<S>>

export type UseState<S> = [S, SetState<S>]

export type Maybe<T> = T | null | undefined
