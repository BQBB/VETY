import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { BlogService } from '../services/BlogService';
import { BASE_URL } from '../utils/constants';
import AlertMsg from '../components/AlertMsg'
import Loader from '../components/Loader'
import useSnack from '../hooks/useSnack';

const Blog = (props) => {
    const [blog, setBlog] = useState({})
    const { error, success} = useSnack()
    const { id } = useParams()
    const [date, setDate] = useState('')
    const [likeIcon, setLikeIcon] = useState('bx:like')
    const [disLikeIcon, setDisLikeIcon] = useState('bx:dislike')
    const [load ,setLoad] = useState(true)

    const handleLike = ()=> {
        let _like = likeIcon;
        let _dislike = disLikeIcon;
        setLikeIcon("bxs:like");
        setDisLikeIcon("bx:dislike");
        (new BlogService).like(id).then(res=> {
            if(res.status != 201) {
                throw new Error('error')
            }
            success('تم الاعجاب')
        }).catch(err => {
          error('حدثت مشكلة ما')
          setDisLikeIcon(_dislike)
          setLikeIcon(_like)
        })
    }

    const handleDislike = ()=> {
        let _like = likeIcon;
        let _dislike = disLikeIcon;
        setDisLikeIcon("bxs:dislike");
        setLikeIcon("bx:like");
        (new BlogService).dislike(id).then(res=> {
            if(res.status != 201) {
                throw new Error('error')
            }
            success('تم الغاء الاعجاب')
        }).catch(err => {
          error('حدثت مشكلة ما')
          setDisLikeIcon(_dislike)
          setLikeIcon(_like)
        })
    }
    
    const handleRedirect = (path) => {
        props.history.push(path)
        return <Redirect to={path} />
    }
    useEffect(()=>{
        console.log();
        (new BlogService).getBlog(id).then(res => {
            if(!res || res.detail && res.detail.length > 0 || res.status != 200) {
                throw new Error('error')
            }

            let d = new Date(res.data.created)
            if(res.data.is_like) {
                setLikeIcon("bxs:like")
            }
            else if(res.data.is_dislike) {
                setDisLikeIcon("bxs:dislike")
            }

            setDate(`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`)
            setBlog({...res.data})
            setLoad(false)
        })
        .catch(err => handleRedirect('/blogs'))
    },[])

  return (
    <div className="mx-auto p-12 sm:p-24">
      {load ? (
        <Loader />
      ) : (
        <>
          {Object.keys(blog).length ? (
            <>
              <div
                style={{
                  backgroundImage: `url("${
                    BASE_URL + blog.image.slice(1, blog.image.length)
                  }")`,
                }}
                className="mt-14 relative h-[50vh] md:h-screen bg-cover bg-blend-darken rounded-md overflow-hidden"
              >
                <div className="z-0 absolute bg-black h-full w-full opacity-50"></div>
                <div className="absolute h-full  z-10 w-full top-2 px-2">
                  <span className="absolute z-20 left-5 top-5 bg-vblue rounded-md text-white text-lg md:text-vmd py-1 px-4">
                    {blog.type.name}
                  </span>
                  <div className=" mx-auto text-white flex flex-col justify-end h-[90%] w-[90%]">
                    <div className="flex flex-col gap-y-2">
                      <h4 className="text-vmd sm:text-vlg">{blog.title}</h4>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center gap-x-1">
                            <FontAwesomeIcon
                              icon={faFeather}
                              className="text-white"
                            />
                            <p className="text-white text-vsm sm:text-lg">
                              {(
                                blog.owner.first_name +
                                " " +
                                blog.owner.last_name
                              ).trim()}
                            </p>
                          </div>
                          <span className="text-white text-vsm sm:text-lg py-1 px-4">
                            {date}
                          </span>
                        </div>
                        {blog.owner.clinic && (
                          <div className="flex gap-x-1">
                            {blog.owner.clinic.facebook && (
                              <a href={blog.owner.clinic.facebook}>
                                <Icon
                                  icon="feather:facebook"
                                  color="#ffffff"
                                  className="mx-auto md:mx-0 h-5 w-5 md:h-7 md:w-7"
                                />
                              </a>
                            )}
                            {blog.owner.clinic.instagram && (
                              <a href={blog.owner.clinic.instagram}>
                                <Icon
                                  icon="feather:instagram"
                                  color="#ffffff"
                                  className="mx-auto md:mx-0 h-5 w-5 md:h-7 md:w-7"
                                />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <hr className="w-full h-[2px] bg-white my-4" />
                  </div>
                </div>
              </div>

              <div className="mt-10 text-sm leading-10 sm:text-[18px]">
                {blog.description}
              </div>

              <div className="flex gap-x-4 text-vblue mt-4">
                <p className=" text-lg sm:text-vmd">هل استفدت من الموضوع ؟</p>
                <div className="flex justify-end items-center gap-x-2">
                  <Icon
                    onClick={handleLike}
                    icon={likeIcon}
                    className="cursor-pointer mx-auto md:mx-0 h-5 w-5 md:h-7 md:w-7"
                  />
                  <Icon
                    onClick={handleDislike}
                    icon={disLikeIcon}
                    className="cursor-pointer mx-auto md:mx-0 h-5 w-5 md:h-7 md:w-7"
                  />
                </div>
              </div>
            </>
          ) : (
            <p>المقالة التي تبحث عنها غير متوفرة</p>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
