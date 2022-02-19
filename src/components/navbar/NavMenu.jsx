import React from 'react'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../context/AuthContext';

const NavMenu = (props) => {
    const { isAuthed } = useAuth(AuthContext)
    return (
        <div className={`grow flex-col md:flex-row ${!props.show? 'hidden md:flex' : 'flex'}`}>
            <ul className='grow justify-center flex flex-col items-center md:flex-row gap-x-8 gap-y-5 text-lg mb-5 md:mb-0'>
              {props.children}
            </ul>
            {isAuthed && <Link to='/profile'><Icon icon="bx:bxs-user" color="#2A7699" className="mx-auto md:mx-0 h-6 w-6 md:h-9 md:w-9" /></Link>}
        </div>
    )
}

export default NavMenu