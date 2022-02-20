import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center text-vblue mt-10'>
            <div className='animate-spin border-4 border-solid border-vblue border-b-0 rounded-full w-20 h-20 sm:w-40 sm:h-40'></div>
    </div>
  )
}

export default Loader