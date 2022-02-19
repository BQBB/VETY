import React from 'react'

const AlertMsg = (props) => {
  return (
    <p className={`text-${props.category} text-sm mt-2`} >{props.msg}</p>
  )
}

export default AlertMsg