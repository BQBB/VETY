import { faBirthdayCake, faCertificate, faMars, faMicrochip, faWeight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import QRCode from "qrcode.react";
import VaccineCard from '../components/cards/VaccineCard';
import ReportCard from '../components/cards/ReportCard';

const Pet = () => {
  return (
    <Container>
        <Grid style='mt-14'>
        <GridItem style='md:col-span-4 mb-10 flex flex-col items-center md:items-start'>
            <img src='https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg' alt='profile img' className="rounded-full w-40 h-40 sm:w-60 sm:h-60 mt-4 sm:mt-10" />
            <ul className="mt-4 sm:mt-10">
                <p className="flex items-start gap-x-2 text-lg sm:text-vmd text-center md:text-right">Pappy<FontAwesomeIcon icon={faMars} className='text-vblue' /></p>
                <li className="flex items-center gap-x-4  mt-2  sm:mt-5">
                    <FontAwesomeIcon icon={faCertificate} className="text-vblue fsicon" />
                    <p className="text-vsm sm:text-lg">كلب</p>
                </li>
                <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon icon={faBirthdayCake} className="text-vblue fsicon" />
                    <p className="text-vsm sm:text-lg">1 سنة</p>
                </li>

                <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon icon={faWeight} className="text-vblue fsicon" />
                    <p className="text-vsm sm:text-lg">1 كغ</p>
                </li>

                <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon icon={faMicrochip} className="text-vblue fsicon" />
                    <p className="text-vsm sm:text-lg">193857392847593</p>
                </li>
            </ul>

            <div className='mt-10 flex flex-col items-center'>
                    <QRCode
                    value={"Happy New Year Ali"}
                    size={128}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={true}
                    renderAs={"svg"}
                    />

                    <button className='bg-vred text-white flex gap-x-2 rounded-md shadow-sm hover:shadow-md py-2 px-4 sm:px-8'>حذف الحيوان</button>     
            </div>

        </GridItem>
        <GridItem style='md:col-span-8'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg sm:text-vmd md:text-vlg text-vblue'>اللقاحات</h2>
                    <p className="text-vblue bg-vgray px-4 md:px-8 py-2 rounded-lg hover:shadow-md text-vsm">عرض المزيد</p>
                </div>
            <Grid style='gap-4 mt-10'>
                <GridItem style='sm:col-span-6 md:col-span-4'>
                    <VaccineCard name='لقاح الجيوبيولين' clinic='العيادة البيطرية التخصصية' date='1/1/2020' />
                </GridItem>
                <GridItem style='sm:col-span-6 md:col-span-4'>
                    <VaccineCard name='لقاح الجيوبيولين' clinic='العيادة البيطرية التخصصية' date='1/1/2020' />
                </GridItem>
                <GridItem style='sm:col-span-6 md:col-span-4'>
                    <VaccineCard name='لقاح الجيوبيولين' clinic='العيادة البيطرية التخصصية' date='1/1/2020' />
                </GridItem>
            </Grid>

            <div className='flex justify-between items-center mt-10'>
                    <h2 className='text-lg sm:text-vmd md:text-vlg text-vblue'>التقارير</h2>
                    <p className="text-white bg-vblue px-4 md:px-8 py-2 rounded-lg hover:shadow-md text-vsm">عرض المزيد</p>
            </div>

            <Grid style='gap-4 mt-10'>
                <GridItem style='sm:col-span-6 md:col-span-4'>
                    <ReportCard description='هو ببساطة نص شكلي بمعنى أن الغاية هي الشكل وليس المحتوى ويُستخدم صناعات المطابع ودور' name='لقاح الجيوبيولين' clinic='العيادة البيطرية التخصصية' date='1/1/2020' />
                </GridItem>
                <GridItem style='sm:col-span-6 md:col-span-4'>
                    <ReportCard description='هو ببساطة نص شكلي بمعنى أن الغاية هي الشكل وليس المحتوى ويُستخدم صناعات المطابع ودور' name='لقاح الجيوبيولين' clinic='العيادة البيطرية التخصصية' date='1/1/2020' />
                </GridItem>
                <GridItem style='sm:col-span-6 md:col-span-4'>
                    <ReportCard description='هو ببساطة نص شكلي بمعنى أن الغاية هي الشكل وليس المحتوى ويُستخدم صناعات المطابع ودور' name='لقاح الجيوبيولين' clinic='العيادة البيطرية التخصصية' date='1/1/2020' />
                </GridItem>
            </Grid>

        </GridItem>
        </Grid>
  </Container>
  );
};

export default Pet;
