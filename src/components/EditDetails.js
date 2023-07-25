import React from "react"
import { useSelector } from "react-redux"

const EditDetails = (props) => {

    const users = useSelector( (state) => {
        return state.users.allUsers
    })

    console.log(users)

    return (
        <div>
            <h1>listing users {users.length}</h1>
        </div>
    )
}

export default EditDetails