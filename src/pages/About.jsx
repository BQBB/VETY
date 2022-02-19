import React from 'react'
import Container from '../components/Container'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'
import cat from '../assets/imgs/cat.png'
import dog from '../assets/imgs/dog.png'

const About = () => {
    return ( 
        <Container>
            <h2 className='text-vblue text-lg sm:text-vmd md:text-vlg text-center mt-14'>من نحن</h2>
            <div className='mt-10'>
                <Grid style='items-center gap-x-4'>
                    <GridItem style='sm:col-span-6 order-2 md:order-1'>
                            <p className='text-lg sm:text-vmd'>نهدف الى الارتقاء بمستوى الرعاية للحيوانات الاليفة بالعراق</p>
                            <p className='text-vsm sm:text-lg mt-4'>انطلقنا لحل العديد من مشاكل التي يواجهها اصحاب الحيوانات الاليفة بالعراق و منها صعوبة اختيار العيادة البيطرية المناسبة لنوع الحيوان الاليف و متابعة حالته الصحية و بسبب الاختبارات الخاطئة و التجارب السيئة السابقة لعدد من المربين عند البحث عن العيادات البيطرية انعكست بشكل سلبي على صحة و سلامة حيواناتهم الاليفة و دت الى فقدان ثقة المربي بالعيادات البيطرية</p>
                    </GridItem>
                    <img src={cat} alt='cat img' className='col-span-12 order-1 md:order-2 mx-auto w-[20rem] h-[20rem] mb-4 sm:mb-0 sm:w-auto sm:h-auto sm:col-span-6' />
                </Grid>
            </div>

            <div className='mt-10'>
                <Grid style='items-center gap-x-4'>
                    <img src={dog} alt='dog img' className='col-span-12 mx-auto w-[20rem] h-[20rem] mb-4 sm:mb-0 sm:w-auto sm:h-auto sm:col-span-6' />
                    <GridItem style='sm:col-span-6'>
                            <p className='text-lg sm:text-vmd'>نحن هنا لإعادة بناء هذة الثقة بروابط اقوى من سابقتها</p>
                            <p className='text-vsm sm:text-lg mt-4'>منصة الكترونية لجميع الاشخاص المحبين للحيوانات الاليفة و المالكين لها  نساعدكم على فهم احتياجات حيواناتكم الالفية و طرق الرعاية السليمة و الاعتناء و التغذية لحيوانك المدلل و كذلك متابعة حالتهم الصحية مع الطبيب الذي يحبه حيوانك</p>
                    </GridItem>
                </Grid>
            </div>
        </Container>
    )
}

export default About
