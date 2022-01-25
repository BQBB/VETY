import { faBirthdayCake, faEnvelope, faLocationArrow, faPhone, faTransgenderAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import Scheduler from '../components/Scheduler';
import profile from '../assets/imgs/default.svg'
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <Container>
        <Grid style='mt-14'>
        <GridItem style='md:col-span-4 mb-10 flex flex-col items-center md:items-start'>
            <img src={profile} alt='profile img' className="w-40 h-40 sm:w-60 sm:h-60 mt-4 sm:mt-10 md:w-auto md:h-auto" />
            <ul className="mt-4 sm:mt-10 flex flex-col gap-y-2">
                <p className="text-lg sm:text-vmd text-center md:text-right">محمد علي</p>
                <li className="flex items-center gap-x-4 mt-2  sm:mt-5">
                <FontAwesomeIcon icon={faPhone} className="text-vblue fsicon" />
                <p className="text-vsm sm:text-lg">07729999999</p>
                </li>
                <li className="flex items-center gap-x-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-vblue fsicon" />
                <p className="text-vsm sm:text-lg">mohammed@vety.com</p>
                </li>
                <li className="flex items-center gap-x-4">
                <FontAwesomeIcon icon={faBirthdayCake} className="text-vblue fsicon" />
                <p className="text-vsm sm:text-lg">1990/6/12</p>
                </li>
                <li className="flex items-center gap-x-4">
                <FontAwesomeIcon icon={faLocationArrow} className="text-vblue fsicon" />
                <p className="text-vsm sm:text-lg">بغداد - الاعظمية</p>
                </li>
                <li className="flex items-center gap-x-4">
                <FontAwesomeIcon icon={faTransgenderAlt} className="text-vblue fsicon" />
                <p className="text-vsm sm:text-lg">ذكر</p>
                </li>
            </ul>
        </GridItem>
        <GridItem style='md:col-span-8'>
            <Scheduler />
            <div className="mt-10 w-full p-4 rounded-md bg-vgray"> 
                <p className="text-lg sm:text-vmd">حيواناتي الاليفة</p>
                <div className="flex mt-4 gap-y-2 flex-wrap justify-evenly">
                    <Link to='/pet'>
                        <div className="flex flex-col items-center">
                            <img className="rounded-full border border-vblue h-20 w-20 md:h-28 md:w-28" src='https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg' alt='pet img' />
                            <p className="text-vsm sm:text-lg mt-1">Pappy</p>
                        </div>
                    </Link>
                    <Link to='/pet'>
                        <div className="flex flex-col items-center">
                            <img className="rounded-full border border-vblue h-20 w-20 md:h-28 md:w-28" src='https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg' alt='pet img' />
                            <p className="text-vsm sm:text-lg mt-1">Pappy</p>
                        </div>
                    </Link>
                    <Link to='/pet'>
                        <div className="flex flex-col items-center">
                            <img className="rounded-full border border-vblue h-20 w-20 md:h-28 md:w-28" src='https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg' alt='pet img' />
                            <p className="text-vsm sm:text-lg mt-1">Pappy</p>
                        </div>
                    </Link>
                    <Link to='/pet'>
                        <div className="flex flex-col items-center">
                            <img className="rounded-full border border-vblue h-20 w-20 md:h-28 md:w-28" src='https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg' alt='pet img' />
                            <p className="text-vsm sm:text-lg mt-1">Pappy</p>
                        </div>
                    </Link>
                    <div className="flex flex-col items-center cursor-pointer">
                        <div className="flex justify-evenly items-center rounded-full bg-vblue h-20 w-20 md:h-28 md:w-28 hover:opacity-75 " >
                        <div className="rounded-full h-2 w-2 bg-white"></div>
                        <div className="rounded-full h-2 w-2 bg-white"></div>
                        <div className="rounded-full h-2 w-2 bg-white"></div>
                        </div>
                        <p className="text-vsm sm:text-lg mt-1">المزيد</p>
                    </div>
                </div>
            </div>

        </GridItem>
        </Grid>
  </Container>
  );
};

export default Profile;
