import React from 'react'
import logo from '../assets/imgs/logo.svg'
import Container from './Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-vgray mt-14 w-full text-vblue p-4'>
                <Container>
                    <div className='flex flex-col sm:flex-row items-center'>
                        <div className='flex flex-col items-center sm:flex-row gap-x-4 gap-y-4 mb-4 sm:mb-0'>
                            <Link to={'/'}><img src={logo} alt='logo' className="w-24  md:w-32" /></Link>
                            <hr className='h-[2px] w-full sm:h-32 space-x-4 bg-[#cacaca] sm:w-[1px]' />
                        </div>

                        <div className='grow flex w-full sm:w-auto justify-evenly space-x-4 mb-4 sm:mb-0'>
                                <ul className='text-vsm'>
                                    <li className='text-lg  md:text-vmd'>تواصل معنا</li>
                                    <li className='mt-2 flex items-center gap-x-2'><FontAwesomeIcon icon={faFacebookSquare} className='fsicon' /> VETY</li>
                                    <li className='flex items-center gap-x-2'><FontAwesomeIcon icon={faInstagram} className='fsicon' /> vety.iq</li>
                                </ul>

                                <ul className='text-vsm'>
                                    <li className='text-lg  md:text-vmd'>الأقسام</li>
                                    <li className='mt-2'><Link to={'/'}>الرئيسية</Link></li>
                                    <li><Link to={'/clinics'}>العيادات</Link></li>
                                    <li><Link to={'/blogs'}>المقالات</Link></li>
                                    <li><Link to={'/contact'}>الاتصال بنا</Link></li>
                                    <li><Link to={'/about'}>عن المنصة</Link></li>
                                </ul>
                        </div>

                        <p className='text-lg  md:text-vmd'>نساعدك على رعاية حيوانك الاليف</p>
                    </div>

                </Container>
        </div>
    )
}

export default Footer
