import { faBusinessTime, faEnvelope, faLocationArrow, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
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

const Clinic = () => {
  return (
    <Container>
        <Grid style='mt-14'>
        <GridItem style='md:col-span-4 mb-10 flex flex-col items-center md:items-start'>
            <img src={profile} alt='profile img' className="w-40 h-40 sm:w-60 sm:h-60 mt-4 sm:mt-10 md:w-auto md:h-auto" />
            <ul className="mt-4 sm:mt-10">
                <p className="text-lg sm:text-vmd text-center md:text-right">العيادة البيطرية التخصصية</p>
                <li className="flex items-center gap-x-4 mt-2  sm:mt-5">
                    <FontAwesomeIcon icon={faPhone} className="text-vblue fsicon" />
                    <p className="text-vsm sm:text-lg">07729999999</p>
                </li>
                <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon icon={faEnvelope} className="text-vblue fsicon" />
                    <p className="text-vsm sm:text-lg">mohammed@vety.com</p>
                </li>
                <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon icon={faLocationArrow} className="text-vblue fsicon" />
                    <p className="text-vsm sm:text-lg">بغداد - الاعظمية</p>
                </li>
                <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon icon={faBusinessTime} className="text-vblue fsicon" />
                    <p className="text-vsm sm:text-lg">9 صباحا - 5 مساءا</p>
                </li>
                <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon icon={faFacebookSquare} className="text-vblue fsicon" />
                    <p className="text-vsm sm:text-lg">VETY</p>
                </li>
                <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon icon={faInstagram} className="text-vblue fsicon" />
                    <p className="text-vsm sm:text-lg">vety.iq</p>
                </li>
            </ul>

            <div className='mt-10 flex flex-col items-center'>
                    <button className='bg-vgray flex gap-x-2 rounded-md shadow-sm hover:shadow-md py-2 px-4'><img className='fsicon' src={paws} alt='paws' />اضافة حيوان اليف</button>    
                    <div className='flex gap-x-1 mt-1'>
                        {
                            (new Array(5).fill(0)).map((n,i)=>{
                            return <FontAwesomeIcon key={i} icon={i==0? rStar : faStar} className='faicon text-yellow-300' />
                            })
                        }
                    </div>
            </div>

        </GridItem>
        <GridItem style='md:col-span-8'>
            <Scheduler />
            
            <Grid style='gap-4 mt-10'>
                <GridItem style='sm:col-span-6'>
                <DoctorCard name='هيثم الشمري' phone='07729999999' />
                </GridItem>
                <GridItem style='sm:col-span-6'>
                <DoctorCard name='هيثم الشمري' phone='07729999999' />
                </GridItem>
                <GridItem style='sm:col-span-6'>
                <DoctorCard name='هيثم الشمري' phone='07729999999' />
                </GridItem>
                <GridItem style='sm:col-span-6'>
                <DoctorCard name='هيثم الشمري' phone='07729999999' />
                </GridItem>
            </Grid>

        </GridItem>
        </Grid>
  </Container>
  );
};

export default Clinic;
