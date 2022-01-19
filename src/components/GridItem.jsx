import React from 'react'

const GridItem = (props) => {
    return (
        <div className={`col-span-12 ${props.style || ''}`}>
             {props.children} 
        </div>
    )
}

export default GridItem
