import React, { useState } from 'react'
import logo from '../../assets/imgs/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import NavMenu from './NavMenu'
import NavItem from './NavItem'
import Container from '../Container'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const [show, setShow] = useState(false)

    return (
        <div className={`bg-vgray w-full`}>
        <Container>
            <nav className="flex flex-col md:flex-row md:items-center justify-between py-2">
                <div className="flex justify-between items-center md:items-start">
                    <Link to={'/'}><img src={logo} alt='logo' className="w-24  md:w-32" /></Link>
                    <FontAwesomeIcon icon={show? faTimes : faBars}  className="md:hidden text-lg cursor-pointer" onClick={()=>setShow(!show)} />
                </div>
            
                <NavMenu show={show}>
                    <NavItem location='/'>الرئيسية</NavItem>
                    <NavItem location='/about'>عن المنصة</NavItem>
                    <NavItem location='/clinics'>العيادات</NavItem>
                    <NavItem location='/blogs'>المقالات</NavItem>
                    <NavItem location='/contact'>الاتصال بنا</NavItem>
                </NavMenu>
            </nav>
        </Container>
        </div>
    )
}

export default NavBar
