import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='h-screen w-full'>
     <main className='w-full flex h-full justify-center items-center'>{children}</main> 
    </div>
  )
}

export default Layout
