import { faBirthdayCake, faEnvelope, faLocationArrow, faPhone, faTransgenderAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import Scheduler from '../components/Scheduler';
import profile from '../assets/imgs/default.svg'
import { Link } from 'react-router-dom';
import {AuthService} from '../services/AuthService'
import { BASE_URL } from '../utils/constants';
import Loader from '../components/Loader';

const Profile = () => {
    const [user, setUser] = useState({})
    const [appointments, setAppointments] = useState([])
    const [load ,setLoad] = useState(true)

  useEffect(() => {
    new AuthService()
      .me()
      .then((res) => {
        if (res.status != 200) {
          throw new Error("err");
        }

        setUser({ ...res.data });
        let appoints = [];
        res.data.member.appointment.map((appoint) => {
          appoints.push({
            Id: appoint.id,
            Subject: appoint.clinic.clinic_name,
            StartTime: new Date(appoint.start_date.split(":")[0] + ":00:00"),
            EndTime: new Date(appoint.end_date.split(":")[0] + ":00:00"),
            IsAllDay: false,
          });
        });
        setAppointments([...appoints]);
        setLoad(false);
      })
      .catch((err) => null);
  }, []);
  return (
    <Container>
      {load ? (
        <Loader />
      ) : (
        <>
          <Grid style="mt-14">
            <GridItem style="md:col-span-4 mb-10 flex flex-col items-center md:items-start">
              <img
                src={profile}
                alt="profile img"
                className="w-40 h-40 sm:w-60 sm:h-60 mt-4 sm:mt-10 md:w-auto md:h-auto"
              />
              <ul className="mt-4 sm:mt-10 flex flex-col gap-y-2">
                <p className="text-lg sm:text-vmd text-center md:text-right">
                  {(user.first_name + " " + user.last_name).trim()}
                </p>
                {user.phone_number ? (
                  <li className="flex items-center gap-x-4 mt-2  sm:mt-5">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-vblue fsicon"
                    />
                    <p className="text-vsm sm:text-lg">{user.phone_number}</p>
                  </li>
                ) : null}
                {user.email ? (
                  <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-vblue fsicon"
                    />
                    <p className="text-vsm sm:text-lg">{user.email}</p>
                  </li>
                ) : null}
                {/* <li className="flex items-center gap-x-4">
                <FontAwesomeIcon icon={faBirthdayCake} className="text-vblue fsicon" />
                <p className="text-vsm sm:text-lg">1990/6/12</p>
                </li> */}
                {user.address ? (
                  <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon
                      icon={faLocationArrow}
                      className="text-vblue fsicon"
                    />
                    <p className="text-vsm sm:text-lg">
                      {user.address.city.name + " - " + user.address.zone.name}
                    </p>
                  </li>
                ) : null}
                {user.member?.gender ? (
                  <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon
                      icon={faTransgenderAlt}
                      className="text-vblue fsicon"
                    />
                    <p className="text-vsm sm:text-lg">{user.member.gender}</p>
                  </li>
                ) : null}
              </ul>
            </GridItem>
            <GridItem style="md:col-span-8">
              <Scheduler canAdd={false} data={appointments} />
              <div className="mt-10 w-full p-4 rounded-md bg-vgray">
                <p className="text-lg sm:text-vmd">حيواناتي الاليفة</p>
                <div className="flex mt-4 gap-y-2 flex-wrap justify-evenly">
                  {user.member?.pet.length
                    ? user.member.pet.map((pet, i) => {
                        return (
                          <Link key={i} to={`/pet/${pet.id}`}>
                            <div className="flex flex-col items-center">
                              <img
                                className="rounded-full border border-vblue h-20 w-20 md:h-28 md:w-28"
                                src={
                                  BASE_URL +
                                  pet.image.slice(1, pet.image.length)
                                }
                                alt="pet img"
                              />
                              <p className="text-vsm sm:text-lg mt-1">
                                {pet.name}
                              </p>
                            </div>
                          </Link>
                        );
                      })
                    : null}

                  <Link to={'/pets'} className="flex flex-col items-center cursor-pointer">
                    <div className="flex justify-evenly items-center rounded-full bg-vblue h-20 w-20 md:h-28 md:w-28 hover:opacity-75 ">
                      <div className="rounded-full h-2 w-2 bg-white"></div>
                      <div className="rounded-full h-2 w-2 bg-white"></div>
                      <div className="rounded-full h-2 w-2 bg-white"></div>
                    </div>
                    <p className="text-vsm sm:text-lg mt-1">المزيد</p>
                  </Link>
                </div>
              </div>
            </GridItem>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Profile;
