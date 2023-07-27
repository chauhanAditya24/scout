import React from "react"
import { useSelector } from "react-redux"

const EditDetails = (props) => {

    const { users, grounds} = useSelector( (state) => {
        return {
            users : state.users.allUsers,
            grounds: state.grounds.groundsList
        }
    })

    console.log('ground list', grounds)

    return (
        <div>
            <h1>listing users {users.length}</h1>
        </div>
    )
}

export default EditDetails