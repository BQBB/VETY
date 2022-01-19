import React from 'react'

const LoadingScreen = () => {
    return (
        <div className='flex justify-center items-center min-h-screen text-vblue'>
            <div className='animate-spin border-4 border-solid border-vblue border-b-0 rounded-full w-32 h-32 sm:w-52 sm:h-52  md:h-56 md:w-56'></div>
        </div>
    )
}

export default LoadingScreen
