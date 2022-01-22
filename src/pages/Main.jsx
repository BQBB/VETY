import React from 'react'
import Container from '../components/Container'
import { faCalendar, faPhone, faHospitalAlt, faStar, faBlog } from '@fortawesome/free-solid-svg-icons'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'
import main from '../assets/imgs/main.png'
import ClinicCard from '../components/cards/ClinicCard'
import ServiceCard from '../components/cards/ServiceCard'
import BlogCard from '../components/cards/BlogCard'
import { Link } from 'react-router-dom'

const services = [
    {
      icon: faCalendar,
      title: 'حجز موعد',
      description: 'نسهل عليكم حجز المواعيد مع عيادتكم البيطرية المفضلة'
    },
    {
      icon: faBlog,
      title: 'مقالات',
      description: 'نعرض لكم مجموعة من المقالات المختلفة التي تساعدكم في التربية السليمة و التغذية الصحية و طرق الرعاية و التعامل مع حيواناتكم الاليفة بواسطة اطباء بيطرين'
    },
    {
      icon: faPhone,
      title: 'الاتصال بالطبيب البيطري',
      description: 'نسهل عليكم عملية التواصل و الاتصال مع الطبيب البيطري'
    },
    {
      icon: faHospitalAlt,
      title: 'عيادات',
      description: 'ستجد العيادة البيطرية التي تثق بها و التي سيحبها حيوانك الاليف'
    },
    {
      icon: faStar,
      title: 'تقيم للعيادات',
      description: 'نظام تفييم فعلي و حقيقي للعيادات البيطرية من قبل المراجعين'
    }
  ]

const Main = () => {



    return (
    <>
        <header className="pb-10 sm:pb-0 sm:h-screen bg-vgray md:overflow-hidden">
        <Container bg='bg-vgray px-5 md:px-0'>
        <Grid>
            <GridItem style="md:col-span-6 mt-10 md:mt-[60px] order-3 md:order-[0]">
                <p className="font-air md:w-[77%] text-vmd md:text-vlg lg:text-[50px]">لأننا نهتم بصحة <span className="text-vblue">حيوانك الأليف</span> نساعدك على الأعتناء به</p>
                <p className="font-air md:w-3/4 text-sm lg:text-lg text-[#7c7c7c] mt-10">نساعدك على الرعاية و الاعتناء بحيوانك الاليف عن طريق مجموعة من الخدمات التي نقدمها</p>
                <div className="flex mt-4 gap-x-4 text-vsm">
                    <Link to='/register' className="bg-vblue text-white px-8 py-2 rounded-lg shadow-lg">إنشاء حساب</Link>
                    <Link to='/login' className="px-8 py-2 bg-white border border-vblue rounded-lg text-vblue">تسجيل الدخول</Link>
                </div>
            </GridItem>
            <img src={main} className="col-span-12 md:col-span-6 md:mt-5 md:block w-[20rem] sm:w-[25rem] md:w-auto mx-auto"/>
            
        </Grid>

        </Container>
        </header>

        <Container>
            <h2 className="text-vblue text-center text-vmd md:text-vlg mt-14">خدماتنا</h2>
            <Grid style='mt-10 gap-x-8 gap-y-4'>

                {
                    services.map((card,i)=>{
                        return (
                        <GridItem style={`sm:col-span-6 md:col-span-4 ${i===3? 'md:col-start-3' : (i===4? 'md:col-start-7' : '')}`} key={i}>
                            <ServiceCard icon={card.icon} title={card.title} description={card.description} />
                        </GridItem>
                        )
                    })
                }

            </Grid>
        </Container>

            <div className='bg-vgray mt-14 p-5'>
                <Container>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-lg sm:text-vmd md:text-vlg text-vblue'>العيادات</h2>
                        <Link to={'/clinics'} className="text-white bg-vblue px-4 md:px-8 py-2 rounded-lg hover:shadow-md text-vsm">عرض المزيد</Link>
                    </div>
                    <Grid style='mt-10 gap-x-8 gap-y-4'>

                        {
                        (new Array(3).fill(0)).map((card,i)=>{
                            return (
                                <GridItem style={`sm:col-span-6 md:col-span-4 `} key={i}>
                                        <Link to='/clinic'>
                                            <ClinicCard name='عيادة ابن الهيثم البيطرية' location='بغداد - السيدية' bg='bg-white' />
                                        </Link>
                                </GridItem>
                            )
                        })
                        }

                    </Grid>
                </Container>
            </div>
        
        <Container>
                <div className='flex justify-between items-center mt-14'>
                    <h2 className='text-lg sm:text-vmd md:text-vlg text-vblue'>المقالات</h2>
                    <Link to={'/blogs'} className="text-vblue bg-vgray px-4 md:px-8 text-vsm py-2 rounded-lg hover:shadow-md">عرض المزيد</Link>
                </div>
                <Grid style='mt-10 gap-x-8 gap-y-4'>

                    {
                    (new Array(3).fill(0)).map((card,i)=>{
                        return (
                            <GridItem style={`sm:col-span-6 md:col-span-4 `} key={i}>
                                    <Link to='/blog' >
                                        <BlogCard likes={50} dislikes={20} author='vety' title='الكلاب و التلفاز' category='الكلاب' excerpt='هل سبق لك أن لاحظت أن كلبك يهتم و يستمتع بمشاهدة التلفاز ؟ إذا كان الأمر كذلك ، فلا بد أنك تساءلت عما قد يفكرون فيه أثناء مشاهدة التلفاز' />
                                    </Link>
                            </GridItem>
                        )
                    })
                    }

                </Grid>
        </Container>
                

        

         
    </>
    )
}

export default Main
