import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '../components/cards/BlogCard'
import Container from '../components/Container'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'

const Blogs = () => {
    const [count, setCount] = useState(6)

    return (
        <Container>
            <div className='mt-14 flex justify-between items-center'>
                <div className='flex gap-x-4 items-center'>
                    <Link to='/' className='text-vblue text-lg sm:text-vmd'>الرئيسية</Link>
                    <FontAwesomeIcon icon={faChevronLeft} className='text-vblue' />
                    <p className='text-[#7c7c7c] text-lg sm:text-vmd'>المقالات</p>
                </div>
                <button className='rounded-md text-vblue text-vsm bg-vgray py-2 px-4'>الكل</button>
            </div>
            <Grid style='mt-10 gap-8'>

                {
                (new Array(count).fill(0)).map((card,i)=>{
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
            <button className="text-vblue bg-vgray table mx-auto px-4 py-2 rounded-lg hover:shadow-md mt-14" onClick={()=>setCount(count+3)}>عرض المزيد</button>
        </Container>
    )
}

export default Blogs
