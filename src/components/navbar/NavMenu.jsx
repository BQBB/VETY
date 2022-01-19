import React from 'react'
import { Icon } from '@iconify/react';

const NavMenu = (props) => {
    return (
        <div className={`grow flex-col md:flex-row ${!props.show? 'hidden md:flex' : 'flex'}`}>
            <ul className='grow justify-center flex flex-col items-center md:flex-row gap-x-8 gap-y-5 text-lg mb-5 md:mb-0'>
              {props.children}
            </ul>
            <Icon icon="bx:bxs-user" color="#2A7699" className="mx-auto md:mx-0 h-6 w-6 md:h-9 md:w-9" />
        </div>
    )
}

export default NavMenu