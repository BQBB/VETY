import React from 'react'

export const Grid = (props) => {
    return (
        <div className={`grid grid-cols-12 ${props.style || ''}`}>
            {props.children}
        </div>
    )
}

export default Grid