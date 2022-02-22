import React from 'react'
import Rate from '../Rate'

const ClinicCard = (props) => {


    return (
        <div className={`${props.bg || ''} flex flex-col items-center py-4 px-2 rounded-md`}>
            <h3 className='text-vblue text-vmd text-center'>{props.name}</h3>
            <p className='text-black mt-3 text-center text-vsm'>{props.location}</p>
            <Rate count={props.rate || 0} />
        </div>
    )
}

export default ClinicCard
