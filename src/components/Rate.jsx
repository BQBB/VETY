import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as rStar} from '@fortawesome/free-regular-svg-icons'
import React from 'react'

const Rate = (props) => {
  return (
    <div className='flex gap-x-2 mt-1' style={{direction: 'ltr'}}>
    {
        (new Array(5).fill(0)).map((n,i)=>{
          return <FontAwesomeIcon onClick={()=> props.handleClick(i+1)} key={i} icon={(i < props.count? faStar : rStar)} className='cursor-pointer faicon text-yellow-300' />
        })

    }
    </div>
  )
}

export default Rate