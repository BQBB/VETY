import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ClinicCard from '../components/cards/ClinicCard'
import Container from '../components/Container'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'
import Loader from '../components/Loader'
import { ClinicService } from '../services/ClinicService'


const Clinics = () => {
  const [count, setCount] = useState(6);
  const [clinics, setClinics] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    new ClinicService()
      .all()
      .then((res) => {
        if (res.status != 200) {
          throw new Error("Error");
        }

        setClinics([...clinics, ...res.data]);
        setLoad(false);
      })
      .catch((err) => setLoad(false));
  }, []);
  return (
    <Container>
      {load ? (
        <Loader />
      ) : (
        <>
          <div className="flex gap-x-4 items-center mt-14">
            <Link to="/" className="text-vblue text-lg sm:text-vmd">
              الرئيسية
            </Link>
            <FontAwesomeIcon icon={faChevronLeft} className="text-vblue" />
            <p className="text-[#7c7c7c] text-lg sm:text-vmd">العيادات</p>
          </div>
          {clinics.length > 0 ? (
            <Grid style="mt-10 sm:gap-x-8 gap-y-4">
              {clinics.map((clinic, i) => {
                return (
                  <GridItem style={`sm:col-span-6 md:col-span-4 `} key={i}>
                    <Link to={`/clinic/${clinic.id}`}>
                      <ClinicCard
                        name={clinic.clinic_name}
                        location={
                          clinic.user.address.city.name +
                          " - " +
                          clinic.user.address.zone.name
                        }
                        bg="bg-vgray"
                        rate={clinic.rating_average}
                      />
                    </Link>
                  </GridItem>
                );
              })}
            </Grid>
          ) : (
            <p>لاتتوفر عيادات بيطرية في الوقت الحالي</p>
          )}
          {!(count >= clinics.length) && (
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

export default Clinics
