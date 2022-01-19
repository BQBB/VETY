import React from 'react'
import Footer from '../components/Footer'
import NavBar from '../components/navbar/NavBar'

const Layout = (props) => {
    return (
        <>
            <NavBar />
                <div className='font-expo'>
                    {props.children}
                </div>
            <Footer />
        </>
    )
}

export default Layout
