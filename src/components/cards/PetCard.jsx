import { faBirthdayCake, faCertificate, faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const PetCard = (props) => {
  return (
        <div className='bg-vgray p-4 rounded-md items-center'>
            <img src={props.img} alt='profile img' className="rounded-md w-full h-full sm:h-20 md:h-24" />
            <ul  className="items-center mt-4 flex flex-col">
                <p className="flex gap-x-2 text-lg sm:text-vmd justify-center sm:justify-start items-center">
                        {props.name}
                    {props.gender == "male" ? (
                            <FontAwesomeIcon icon={faMars} className="text-vblue" />
                            ) : (
                            <FontAwesomeIcon icon={faVenus} className="text-vblue" />
                            )}
                </p>
                <li className="flex items-center gap-x-2  mt-2">
                    <FontAwesomeIcon
                      icon={faCertificate}
                      className="text-vblue fsicon"
                    />
                    <p className="text-vsm sm:text-lg">{props.type}</p>
                  </li>
            </ul>
        </div>
  )
}

export default PetCard