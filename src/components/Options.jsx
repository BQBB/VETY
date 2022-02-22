import React from 'react'

const Options = (props) => {
  return (
    <div className="flex flex-col mt-4">
      <label className="text-[#102840] text-vsm" htmlFor={props.for}>
        {props.name}
      </label>
      <select className="p-2.5 border-[2px] border-vblue focus:ouline-none rounded-md bg-white" onChange={props.handleOptions} value={props.value}>
        {props.options.map((item, i) => {
          return <option key={i} value={item.value}>{item.title}</option>;
        })}
      </select>
    </div>
  )
}

export default Options