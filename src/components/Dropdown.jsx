import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const DropDown = (props) => {
  return (
    <>
            <button onClick={props.handleShow} className='rounded-md text-vblue text-vsm bg-vgray py-2 px-4 flex gap-x-1 items-center'>{props.value}<FontAwesomeIcon icon={faAngleDown} className='text-vblue' /></button>
            <ul className={`rounded-md text-vblue text-vsm bg-vgray mt-1 text-center ${props.show? 'block' : 'hidden'}`}>
                        <li className={`cursor-pointer py-1 px-4 ${(props.value==props.default) && 'bg-[#dfdfdf]'}`} onClick={()=> props.handleMenu(props.default)}>{props.default}</li>
                        {
                            props.list.map((item,i)=>{
                                return <li key={i} className={`cursor-pointer py-1 px-4 ${(props.value==item) && 'bg-[#dfdfdf]'}`} onClick={()=> props.handleMenu(item)}>{item}</li>
                            })
                        }
            </ul>
    </>
  )
}

export default DropDown