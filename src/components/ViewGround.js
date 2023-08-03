import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

const ViewGround = (props) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetUserGround())
    },[dispatch])
    
    return (
        <div>

        </div>
    )
}

export default ViewGround