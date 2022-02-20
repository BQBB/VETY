import { faSyringe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ReportCard = (props) => {
  return (
    <div className='bg-vgray p-4 rounded-md flex flex-col items-center'>
        <p className="text-vblue flex text-center items-start gap-x-2 text-lg sm:text-vmd"><FontAwesomeIcon icon={faSyringe} className='text-vblue' />{props.name}</p>
        <p className='text-center text-vsm sm:text-lg mt-2'>{props.clinic}</p>
        <p className='text-center text-vsm text-{#4b4b4b} mt-1 sm:text-md'>{props.description}</p>
        <p className='text-center text-vsm text-{#4b4b4b}'>{props.date}</p>
    </div>
  );
};

export default ReportCard;
