import { faBirthdayCake, faCertificate, faMars, faMicrochip, faVenus, faWeight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import QRCode from "qrcode.react";
import VaccineCard from '../components/cards/VaccineCard';
import ReportCard from '../components/cards/ReportCard';
import {PetService} from '../services/PetService'
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { Redirect } from 'react-router-dom';
import Loader from '../components/Loader';

const Pet = (props) => {

    const { id } = useParams()
    const [pet, setPet] = useState({})
    const [load ,setLoad] = useState(true)

    const handleRedirect = (path) => {
      props.history.push(path);
      return <Redirect to={path} />;
    }
    const deletePet = ()=> {
        new PetService()
          .deletePet(id)
          .then((res) => {
            if (
              !res ||
              res.status != 204 ||
              (res.detail && res.detail.length > 0)
            ) {
              throw new Error("err");
            }
            handleRedirect("/pets");
          })
          .catch((err) => null);
    }
    useEffect(()=>{
        (new PetService).getPet(id).then(res => {
          if (
            !res ||
            res.status != 200 ||
            (res.detail && res.detail.length > 0)
          ) {
            throw new Error("err");
          }

          setPet({ ...res.data });
          setLoad(false);
        }).catch(err => handleRedirect('/'))
      },[])
  return (
    <Container>
      {load ? (
        <Loader />
      ) : (
        <>
          {Object.keys(pet).length ? (
            <Grid style="mt-14">
              <GridItem style="md:col-span-4 mb-10 flex flex-col items-center md:items-start">
                <img
                  src={BASE_URL + pet.image.slice(1, pet.image.length)}
                  alt="profile img"
                  className="rounded-full w-40 h-40 sm:w-60 sm:h-60 mt-4 sm:mt-10"
                />
                <ul className="mt-4 sm:mt-10 flex flex-col gap-y-2">
                  <p className="flex gap-x-2 text-lg sm:text-vmd justify-center sm:justify-start items-center">
                    {pet.name}
                    {(pet.gender == "male") ? (
                      <FontAwesomeIcon icon={faMars} className="text-vblue" />
                    ) : (
                      <FontAwesomeIcon icon={faVenus} className="text-vblue" />
                    )}
                  </p>
                  <li className="flex items-center gap-x-4  mt-2  sm:mt-5">
                    <FontAwesomeIcon
                      icon={faCertificate}
                      className="text-vblue fsicon"
                    />
                    <p className="text-vsm sm:text-lg">{pet.type.name}</p>
                  </li>
                  <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon
                      icon={faBirthdayCake}
                      className="text-vblue fsicon"
                    />
                    <p className="text-vsm sm:text-lg">{pet.age} سنة</p>
                  </li>

                  <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon
                      icon={faWeight}
                      className="text-vblue fsicon"
                    />
                    <p className="text-vsm sm:text-lg">{pet.weight} كغ</p>
                  </li>

                  <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon
                      icon={faMicrochip}
                      className="text-vblue fsicon"
                    />
                    <p className="text-vsm sm:text-lg">{pet.chip_num}</p>
                  </li>
                  <Link to={`/edit/pet/${pet.id}`} className='text-center text-vblue bg-vgray py-1 px-4 w-full rounded-md hover:shadow-md text-vsm sm:text-lg'>تعديل</Link>
                </ul>

                <div className="mt-10 flex flex-col items-center">
                  <QRCode
                    value={pet.id}
                    size={128}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={true}
                    renderAs={"svg"}
                  />

                  <button
                    className="bg-vred text-white flex gap-x-2 rounded-md shadow-sm hover:shadow-md py-2 px-4 sm:px-8"
                    onClick={deletePet}
                  >
                    حذف الحيوان
                  </button>
                </div>
              </GridItem>
              <GridItem style="md:col-span-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg sm:text-vmd md:text-vlg text-vblue">
                    اللقاحات
                  </h2>
                  <Link
                    className="text-vblue bg-vgray px-4 md:px-8 py-2 rounded-lg hover:shadow-md text-vsm"
                    to={`/vaccine/pet/${id}`}
                  >
                    عرض المزيد
                  </Link>
                </div>
                <Grid style="gap-4 mt-10">
                  {pet.vaccine.length ? (
                    pet.vaccine.map((vac, i) => {
                      let d = new Date(vac.created);
                      return (
                        <GridItem key={i} style="sm:col-span-6 md:col-span-4">
                          <VaccineCard
                            name={vac.name}
                            clinic={vac.clinic.clinic_name}
                            date={`${d.getDate()}/${
                              d.getMonth() + 1
                            }/${d.getFullYear()}`}
                          />
                        </GridItem>
                      );
                    })
                  ) : (
                    <p>لا توجد لقاحات</p>
                  )}
                </Grid>

                <div className="flex justify-between items-center mt-10">
                  <h2 className="text-lg sm:text-vmd md:text-vlg text-vblue">
                    التقارير
                  </h2>
                  <Link
                    to={`/report/pet/${id}`}
                    className="text-white bg-vblue px-4 md:px-8 py-2 rounded-lg hover:shadow-md text-vsm"
                  >
                    عرض المزيد
                  </Link>
                </div>

                <Grid style="gap-4 mt-10">
                  {pet.report.length ? (
                    pet.report.map((report, i) => {
                      let d = new Date(report.created);
                      return (
                        <GridItem style="sm:col-span-6 md:col-span-4">
                          <ReportCard
                            description={report.description}
                            name={report.title}
                            clinic={report.clinic.clinic_name}
                            date={`${d.getDate()}/${
                              d.getMonth() + 1
                            }/${d.getFullYear()}`}
                          />
                        </GridItem>
                      );
                    })
                  ) : (
                    <p>لا توجد تقارير</p>
                  )}
                </Grid>
              </GridItem>
            </Grid>
          ) : null}
        </>
      )}
    </Container>
  );
};

export default Pet;
