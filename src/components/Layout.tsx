import { FC, ReactNode } from 'react'

interface LayoutProps {
  children?: ReactNode
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props

  return <div className='min-h-screen flex flex-items-center flex-justify-center bg-black'>{children}</div>
}
