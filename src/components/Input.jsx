import React from 'react';

const Input = (props) => {
  return (
        <div className='flex flex-col mt-4'>
            <label className='text-[#102840] text-vsm' htmlFor={props.for}>{props.label}</label>
            <input type={props.type} name={props.for} id={props.for} className='p-2 border-[2px] border-vblue focus:ouline-none rounded-md' />
        </div>
    );
};

export default Input;
