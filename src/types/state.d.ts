import { Dispatch, SetStateAction } from 'react'

type SetState<S> = Dispatch<SetStateAction<S>>

type UseState<S> = [S, SetState<S>]
