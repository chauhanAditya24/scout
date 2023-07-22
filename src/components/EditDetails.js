import React from "react"
import { useState, useEffect } from "react"
import axios from 'axios'

const EditDetails = (props) => {

    const [ user , setUsers] = useState({})
    const id = '64b51d341c84438e8b69fd78'

    useEffect(() => {
        axios.get(`http://localhost:3088/scout/show/${id}`)
            .then(( res ) => {
                console.log(res)
                setUsers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    } , [])

    return (
        <div>
            <h1>{user.username}</h1>
        </div>
    )
}

export default EditDetails