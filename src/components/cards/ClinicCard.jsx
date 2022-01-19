import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as rStar} from '@fortawesome/free-regular-svg-icons'

const ClinicCard = (props) => {
    return (
        <div className={`${props.bg || ''} flex flex-col items-center py-4 px-2 rounded-md`}>
            <h3 className='text-vblue text-vmd text-center'>{props.name}</h3>
            <p className='text-black mt-3 text-center text-vsm'>{props.location}</p>
            <div className='flex gap-x-2 mt-1'>
                {
                    (new Array(5).fill(0)).map((n,i)=>{
                      return <FontAwesomeIcon key={i} icon={i==0? rStar : faStar} className='faicon text-yellow-300' />
                    })
                }
            </div>
        </div>
    )
}

export default ClinicCard
