import { FC, ReactNode } from 'react'

interface LayoutProps {
  children?: ReactNode
}

export const Layout: FC<LayoutProps> = props => {
  const { children } = props

  return (
    <div
      className='grid h-100% flex-1'
      style={{
        gridTemplateColumns: '100px auto 250px'
      }}
    >
      {children}
    </div>
  )
}
