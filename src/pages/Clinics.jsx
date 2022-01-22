import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ClinicCard from '../components/cards/ClinicCard'
import Container from '../components/Container'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'

const Clinics = () => {
    const [count, setCount] = useState(6)

    return (
        <Container>
            <div className='flex gap-x-4 items-center mt-14'>
                <Link to='/' className='text-vblue text-lg sm:text-vmd'>الرئيسية</Link>
                <FontAwesomeIcon icon={faChevronLeft} className='text-vblue' />
                <p className='text-[#7c7c7c] text-lg sm:text-vmd'>العيادات</p>
            </div>
            <Grid style='mt-10 gap-8'>

                {
                (new Array(count).fill(0)).map((card,i)=>{
                    return (
                            <GridItem style={`sm:col-span-6 md:col-span-4 `} key={i}>
                                <Link to='/clinic' >
                                    <ClinicCard name='عيادة ابن الهيثم البيطرية' location='بغداد - السيدية' bg='bg-vgray' />
                                </Link>
                            </GridItem>
                    )
                })
                }

            </Grid>
            <button className="text-white bg-vblue table mx-auto px-4 py-2 rounded-lg hover:shadow-md mt-14" onClick={()=>setCount(count+3)}>عرض المزيد</button>
        </Container>
    )
}

export default Clinics
