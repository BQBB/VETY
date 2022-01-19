import React, { useState } from 'react'
import ClinicCard from '../components/cards/ClinicCard'
import Container from '../components/Container'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'

const Clinics = () => {
    const [count, setCount] = useState(6)

    return (
        <Container>
            <Grid style='mt-10 gap-x-8 gap-y-4'>

                {
                (new Array(count).fill(0)).map((card,i)=>{
                    return (
                        <GridItem style={`sm:col-span-6 md:col-span-4 `} key={i}>
                            <ClinicCard name='عيادة ابن الهيثم البيطرية' location='بغداد - السيدية' bg='bg-vgray' />
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
