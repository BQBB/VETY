import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PetCard from '../components/cards/PetCard'
import Container from '../components/Container'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'
import Loader from '../components/Loader'
import { PetService } from '../services/PetService'
import { BASE_URL } from '../utils/constants'

const Pets = () => {
    const [count, setCount] = useState(6)
    const [pets, setPets] = useState([])
    const [load ,setLoad] = useState(true)

    useEffect(()=> {


            ((new PetService).all()).then(
                res => {
                    if(res.status != 200) {
                       
                        throw new Error('Error')
                    }

                    setPets([...res.data])
                    setLoad(false)
                }
            ).catch(err => setLoad(false))
    
    },[])
    return (
      <Container>
        {load ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-between mt-14">
              <div className="flex gap-x-4 items-center">
                <Link to="/" className="text-vblue text-lg sm:text-vmd">
                  الرئيسية
                </Link>
                <FontAwesomeIcon icon={faChevronLeft} className="text-vblue" />
                <p className="text-[#7c7c7c] text-lg sm:text-vmd">الحيوانات الاليفة</p>
              </div>
              <Link to={'/create/pet'} className='bg-vgray rounded-md p-2 text-vblue'>اضافة حيوان اليف</Link>
            </div>
            {pets.length > 0 ? (
              <Grid style="mt-10 gap-x-8 gap-y-4">
                {pets.map((pet, i) => {
                  return (
                    <GridItem key={i} style="sm:col-span-6 md:col-span-4">
                      <Link to={`/pet/${pet.id}`}>
                        <PetCard
                            name={pet.name}
                            img={BASE_URL+pet.image.slice(1,pet.image.length)}
                            type={pet.type.name}
                        />
                      </Link>
                    </GridItem>
                  );
                })}
              </Grid>
            ) : (
              <p>لا توجد لديك حيوانات اليفة في هذه المنصة</p>
            )}
            {!(count > pets.length) && (
              <button
                className="text-white bg-vblue table mx-auto px-4 py-2 rounded-lg hover:shadow-md mt-14"
                onClick={() => setCount(count + 3)}
              >
                عرض المزيد
              </button>
            )}
          </>
        )}
      </Container>
    );
}

export default Pets
