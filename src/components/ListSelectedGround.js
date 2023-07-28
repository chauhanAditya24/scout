import React from 'react'
import { useSelector } from 'react-redux'

const ListSelectedGround = (props) => {

    const ground = useSelector((state) => {
        return state.grounds.specificGround
    })


    return (
        <div>
            <h1>{ground.name}</h1>
        </div>
    )
}

export default ListSelectedGround