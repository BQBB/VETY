import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeather } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@iconify/react';
import { BASE_URL } from '../../utils/constants';

const BlogCard = (props) => {
    let img = BASE_URL+props.img.slice(1,props.img.length)
    return (
        <div style={{backgroundImage: `url("${img}")`}} className={`relative h-80 bg-cover bg-blend-darken rounded-md overflow-hidden`}>
            <div className='z-0 absolute bg-black h-full w-full opacity-50'></div>
            <div className='absolute h-full  z-10 w-full top-2 px-2'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center justify-center gap-x-1'>
                        <FontAwesomeIcon icon={faFeather} className='text-white' />
                        <p className='text-white text-vsm'>{props.author}</p>
                    </div>
                    <span className='bg-vblue rounded-md text-white text-vsm py-1 px-4'>{props.category}</span>
                </div>
                    
                    <div className='text-white flex flex-col justify-end h-[85%]'>
                        <h4 className='text-lg mb-4 sm:text-vmd'>{props.title}</h4>
                        <p className='text-sm'>{props.excerpt}</p>
                        <hr className='w-full h-[1px] bg-black opacity-50 my-4' />
                        <div className='flex justify-end items-center gap-x-2'>
                            <div className='flex items-center gap-x-2'>
                                <p className='text-vsm md:text-lg'>{props.dislikes}</p>
                                <Icon icon="bx:bx-dislike" color="#ffffff" className="mx-auto md:mx-0 h-5 w-5 md:h-6 md:w-6" />
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <p className='text-vsm md:text-lg'>{props.likes}</p>
                                <Icon icon="bx:bx-like" color="#ffffff" className="mx-auto md:mx-0 h-5 w-5 md:h-6 md:w-6" />
                            </div>
                        </div>
                    </div>
            </div>
            
        </div>
    )
}

export default BlogCard
