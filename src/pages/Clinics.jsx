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
            <Grid style='mt-10 gap-8'>

                {
                (new Array(count).fill(0)).map((card,i)=>{
                    return (
                        <Link to='/clinic' key={i}>
                            <GridItem style={`sm:col-span-6 md:col-span-4 `}>
                                <ClinicCard name='عيادة ابن الهيثم البيطرية' location='بغداد - السيدية' bg='bg-vgray' />
                            </GridItem>
                        </Link>
                    )
                })
                }

            </Grid>
            <button className="text-white bg-vblue table mx-auto px-4 py-2 rounded-lg hover:shadow-md mt-14" onClick={()=>setCount(count+3)}>عرض المزيد</button>
        </Container>
    )
}

export default Clinics
