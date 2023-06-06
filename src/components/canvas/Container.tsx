import { FC, ReactNode } from "react"

interface ContainerProps {
  children?: ReactNode
}

export const CanvasContainer:FC<ContainerProps> = ({children}:{children?:ReactNode})=>{
  return <div className="f-center">{children}</div>
}
