import React from "react"
import { useSelector } from "react-redux"

const ViewAllUsers = (props) => {

    const user = useSelector((state) => {
        return state.users.viewDetials
    })

    if(user){
        console.log('usersss' ,user)
    }

    return (
        <div>
            <h1>Users data </h1>
        </div>
    )
}

export default ViewAllUsers