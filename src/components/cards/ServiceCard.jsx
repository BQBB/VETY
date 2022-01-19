import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ServiceCard = (props) => {
    return (
        <div className='bg-vgray flex flex-col items-center py-4 px-2 rounded-md'>
            <FontAwesomeIcon icon={props.icon} className='text-vblue faicon' />
            <h3 className='text-vblue mt-3 text-vmd text-center'>{props.title}</h3>
            <p className='text-black mt-1 text-center text-vsm'>{props.description}</p>
        </div>
    )
}

export default ServiceCard
