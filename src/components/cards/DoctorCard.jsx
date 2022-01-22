import { faPhone, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import profile from '../../assets/imgs/default.svg'

const DoctorCard = (props) => {
  return (
      <div className='bg-vgray p-4 flex gap-x-4 rounded-md items-center'>
            <img src={profile} alt='profile img' className="w-20 h-20 sm:w-24 sm:h-24" />
            <ul className='flex flex-col gap-y-4'>
                <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon icon={faStethoscope} className="text-vblue fsicon" />
                    <p className="text-vsm sm:text-lg">د.{props.name}</p>
                </li>
                <li className="flex items-center gap-x-4">
                    <FontAwesomeIcon icon={faPhone} className="text-vblue fsicon" />
                    <p className="text-vsm sm:text-lg">{props.phone}</p>
                </li>
            </ul>

      </div>
  );
};

export default DoctorCard;
