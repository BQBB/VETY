import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const NavItem = (props) => {
    let currentLocation = useLocation()
    return <li className={`hover:text-vblue cursor-pointer relative overflow-hidden ${(currentLocation.pathname == props.location)? 'text-vblue after:block after:content-[""] after:bg-vblue after:h-[1px] after:w-full after:mt-1' : ''}`}><Link to={props.location}>{props.children}</Link></li>
}

export default NavItem
