import React from 'react'

const Unauthorized = () => {
  return (
    <div className='h-full flex flex-col items-center justify-start gap-1'>
        <span className='text-xl font-medium'>  
          403 - Unauthorized 
        </span>
        <p className='text-lg font-normal'>
          You do not have access to this page.
        </p>
    </div>
  )
}

export default Unauthorized;