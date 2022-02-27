import { faBusinessTime, faEnvelope, faLocationArrow, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import Scheduler from '../components/Scheduler';
import profile from '../assets/imgs/default.svg'
import paws from '../assets/imgs/paws.svg'
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
import DoctorCard from '../components/cards/DoctorCard';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as rStar} from '@fortawesome/free-regular-svg-icons'
import { Redirect } from 'react-router-dom';
import { ClinicService } from '../services/ClinicService'
import { PetService } from '../services/PetService'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import PetCard from '../components/cards/PetCard';
import { BASE_URL } from '../utils/constants';
import useSnack from '../hooks/useSnack';
import Rate from '../components/Rate';

const Clinic = (props) => {
    const [clinic, setClinic] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [pets, setPets] = useState([])
    const [load ,setLoad] = useState(true)
    const { id } = useParams()
    const { error, success } = useSnack()
    const [appointments, setAppointments] = useState([])
    const [date, setDate] = useState({})
    const [hours, setHours] = useState({})
    const [ratingCount, setRatingCount] = useState(0)

    async function addAppointment(_date) { 
      return await (new ClinicService).appoint(_date, id)
    }
        
    const handleRate = (point) => {
      (new ClinicService).rate(point,id).then(res => {
        if(!res || res.status !=201) {
          throw new Error('err')
        }
        success('تم تقييم العيادة')
        setRatingCount(point)
    }).catch(err=> error('حدثت مشكلة ما'))
    }

    const handleAddToClinic = (pet)=> {
      (new PetService).addToClinic(pet,id).then(res => {
          if(!res || res.status !=201) {
            throw new Error('err')
          }
          success('تم اضافة حيوانك الاليف الى العيادة')
          setShowModal(false)
      }).catch(err=> error('حدثت مشكلة ما'))
    }

    const handleRedirect = (path) => {
        props.history.push(path)
        return <Redirect to={path} />
    }
    useEffect(()=>{
        (new ClinicService).getClinic(id).then(res => {
            if(!res || res.detail && res.detail.length > 0 || res.status != 200) {
                throw new Error('error')
            }

            setClinic({...res.data})
            setRatingCount(res.data.user_rating)
            let appoints = [];
            res.data.appointment.map((appoint) => {
            appoints.push({
              Id: appoint.id,
              Subject: appoint.member.user.first_name,
              StartTime: new Date(appoint.start_date.split(":")[0] + ":00:00"),
              EndTime: new Date(appoint.end_date.split(":")[0] + ":00:00"),
              IsAllDay: false,
            });
        });

        let _sdate = new Date(`2022-02-20T${res.data.start_date}`)
        let _edate = new Date(`2022-02-20T${res.data.end_date}`)
        setDate({start: !(_sdate.getHours() > 12) ? _sdate.getHours()+" صباحا" : (_sdate.getHours() % 12)+" مساءا",
          end: !(_edate.getHours() > 12) ? _edate.getHours()+" صباحا" : (_edate.getHours() % 12)+" مساءا"
        })

        setHours({start: _sdate.getHours().toString()+":00", end: _edate.getHours().toString()+":00"})
        setAppointments([...appoints]);

        }).catch(err => handleRedirect('/clinics'));

        (new PetService).all().then(res => {
          if(!res || res.detail && res.detail.length > 0 || res.status != 200) {
              throw new Error('error')
          }

          setPets([...res.data])
          setLoad(false)
      })
      .catch(err => setLoad(false))
    },[])

  return (
    <Container>
      {load? <Loader />: (
        <>
          {Object.keys(clinic).length ?<Grid style="mt-14">
        <GridItem style="md:col-span-4 mb-10 flex flex-col items-center md:items-start">
          <img
            src={profile}
            alt="profile img"
            className="w-40 h-40 sm:w-60 sm:h-60 mt-4 sm:mt-10 md:w-auto md:h-auto"
          />
          <ul className="mt-4 sm:mt-10 flex flex-col gap-y-2">
            <p className="text-lg sm:text-vmd text-center md:text-right">
              {clinic.clinic_name}
            </p>
            {clinic.user.phone_number.length ? <li className="flex items-center gap-x-4 mt-2  sm:mt-5">
              <FontAwesomeIcon icon={faPhone} className="text-vblue fsicon" />
              <p className="text-vsm sm:text-lg">{clinic.user.phone_number}</p>
            </li> : null}
            {clinic.user.email.length ? <li className="flex items-center gap-x-4">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-vblue fsicon"
              />
              <p className="text-vsm sm:text-lg">{clinic.user.email}</p>
            </li> : null}
            <li className="flex items-center gap-x-4">
              <FontAwesomeIcon
                icon={faLocationArrow}
                className="text-vblue fsicon"
              />
              <p className="text-vsm sm:text-lg">{clinic.user.address.city.name+ " - "+clinic.user.address.zone.name}</p>
            </li>
            <li className="flex items-center gap-x-4">
              <FontAwesomeIcon
                icon={faBusinessTime}
                className="text-vblue fsicon"
              />
              <p className="text-vsm sm:text-lg">{date.start+" - "+date.end}</p>
            </li>
           {clinic.facebook?.length ?  <li className="flex items-center gap-x-4">
              <FontAwesomeIcon
                icon={faFacebookSquare}
                className="text-vblue fsicon"
              />
              <a href={clinic.facebook} target="_blank" className="text-vsm sm:text-lg">{clinic.facebook.match(/\.com\/(\w+)/)[1]}</a>
            </li> : null}
            {clinic.instagram?.length ? <li className="flex items-center gap-x-4">
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-vblue fsicon"
              />
              <a href={clinic.instagram} target="_blank" className="text-vsm sm:text-lg">{clinic.instagram.match(/\.com\/(\w+)/)[1]}</a>
            </li> : null}
          </ul>

          <div className="mt-10 flex flex-col items-center">
            <button onClick={()=> setShowModal(true)} className="mb-2 bg-vgray flex gap-x-2 rounded-md shadow-sm hover:shadow-md py-2 px-4">
              <img className="fsicon" src={paws} alt="paws" />
              اضافة حيوان اليف
            </button>
            <Rate handleClick={(i)=> handleRate(i)} count={ratingCount} />
          </div>
        </GridItem>
        <GridItem style="md:col-span-8">
          <Scheduler canAdd data={appointments} startHour={hours.start} endHour={hours.end} handleAppointments={addAppointment}  addAppointments={setAppointments} />

          <Grid style="sm:gap-x-4 gap-y-4 mt-10">
            {clinic.doctor.length ? 
              clinic.doctor.map((doc,i)=> {
                return (
                  <GridItem key={i} style="sm:col-span-6">
                    <DoctorCard name={doc.name} phone={doc.phone_number} />
                  </GridItem>
                )
              })
            : null
            }
          </Grid>
        </GridItem>
      </Grid> : null}

      <Modal show={showModal} handleClose={()=> setShowModal(false)}>
              {pets.length ? 
                <Grid style="sm:gap-x-4 gap-y-4 mt-10 p-2">
                  {pets.map((pet,i)=>{
                      return (
                        <GridItem key={i} style="sm:col-span-6">
                          <button className='w-full' onClick={()=> handleAddToClinic(pet.id)}>
                            <PetCard name={pet.name} type={pet.type.name} img={BASE_URL+pet.image.slice(1,pet.image.length)} />
                          </button>
                        </GridItem>
                      )
                  })}
                </Grid>
              : null}
      </Modal>
        </>
      )}
    </Container>
  );
};

export default Clinic;
