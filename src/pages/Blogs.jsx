import React, { useState } from 'react'
import BlogCard from '../components/cards/BlogCard'
import Container from '../components/Container'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'

const Blogs = () => {
    const [count, setCount] = useState(6)

    return (
        <Container>
            <Grid style='mt-10 gap-x-8 gap-y-4'>

                {
                (new Array(count).fill(0)).map((card,i)=>{
                    return (
                        <GridItem style={`sm:col-span-6 md:col-span-4 `} key={i}>
                            <BlogCard likes={50} dislikes={20} author='vety' title='الكلاب و التلفاز' category='الكلاب' excerpt='هل سبق لك أن لاحظت أن كلبك يهتم و يستمتع بمشاهدة التلفاز ؟ إذا كان الأمر كذلك ، فلا بد أنك تساءلت عما قد يفكرون فيه أثناء مشاهدة التلفاز' />
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
