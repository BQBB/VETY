import React from 'react'

const Container = (props) => {
    return (
        <div className={`container mx-auto px-5 ${props.bg || ''}`}>
            {props.children}
        </div>
    )
}

export default Container