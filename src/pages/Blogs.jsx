import { faAngleDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '../components/cards/BlogCard'
import Container from '../components/Container'
import Dropdown from '../components/Dropdown'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'
import Loader from '../components/Loader'
import { BlogService } from '../services/BlogService'

const Blogs = () => {
    const [count, setCount] = useState(6)
    const [blogs, setBlogs] = useState([])
    const [value, setValue] = useState({text: 'الكل'})
    const [show, setShow] = useState(false)
    const [types, setTypes] = useState([])
    const [filterdBlogs, setFilterdBlogs] = useState([])
    const [load ,setLoad] = useState(true)

    const handleMenu = (value) => {
        if(value !='الكل') {
            let filterd = blogs.filter((blog)=> (blog.type.name == value))
            setFilterdBlogs(filterd)
        } 
        else {
            setFilterdBlogs(blogs)
        }

        setValue({text: value})
        setShow(!show)
    }

    useEffect(()=> {


            ((new BlogService).all()).then(
                res => {
                    if(res.status != 200) {
                       
                        throw new Error('Error')
                    }

                    let newBlogs = [...res.data]
                    let newTypes = []
                    newBlogs.map((blog,i)=> {
                        newTypes.push(blog.type.name)
                    })
                    setBlogs([...blogs, ...newBlogs])
                    setFilterdBlogs([...filterdBlogs, ...newBlogs])
                    setTypes([...types, ...(Array.from(new Set(newTypes)))])
                    setLoad(false)
    
                }
            ).catch(err => setLoad(false))
    
    },[])


    return (
      <Container>
        {load ? (
          <Loader />
        ) : (
          <>
            <div className="mt-14 flex justify-between items-center">
              <div className="flex gap-x-4 items-center">
                <Link to="/" className="text-vblue text-lg sm:text-vmd">
                  الرئيسية
                </Link>
                <FontAwesomeIcon icon={faChevronLeft} className="text-vblue" />
                <p className="text-[#7c7c7c] text-lg sm:text-vmd">المقالات</p>
              </div>
              <div>
                {types.length ? (
                  <Dropdown
                    default="الكل"
                    handleShow={() => setShow(!show)}
                    show={show}
                    value={value.text}
                    handleMenu={handleMenu}
                    list={types}
                  />
                ) : null}
              </div>
            </div>
            {filterdBlogs.length > 0 ? (
              <Grid style="mt-10 sm:gap-x-8 gap-y-4">
                {filterdBlogs.map((blog, i) => {
                  return (
                    <GridItem style={`sm:col-span-6 md:col-span-4 `} key={i}>
                      <Link to={`/blog/${blog.id}`}>
                        <BlogCard
                          img={blog.image}
                          likes={blog.like_count}
                          dislikes={blog.dislike_count}
                          author={
                            blog.owner.first_name + " " + blog.owner.last_name
                          }
                          title={blog.title}
                          category={blog.type.name}
                          excerpt={blog.description.slice(0, 136)}
                        />
                      </Link>
                    </GridItem>
                  );
                })}
              </Grid>
            ) : (
              <p>لاتتوفر مقالات في الوقت الحالي</p>
            )}
            {!(count >= filterdBlogs.length) && (
              <button
                className="text-vblue bg-vgray table mx-auto px-4 py-2 rounded-lg hover:shadow-md mt-14"
                onClick={() => setCount(count + 3)}
              >
                عرض المزيد
              </button>
            )}
          </>
        )}
      </Container>
    );
}

export default Blogs
