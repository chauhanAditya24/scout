import React, {useEffect} from 'react'
import {  useDispatch , useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { getCurrentUser } from '../actions/usersAction'

const Account = (props) => {


    const dispatch = useDispatch()

    useEffect(() => {
        console.log('before useeffect')
        dispatch(getCurrentUser())
        console.log('after useEffect')
    },[dispatch])

        const user = useSelector((state) => {
            return state.users.currentUser
        })

    return (
        <div>
            <h1>Account component</h1>
                <ul>
                    <li> username - {user.username}</li>
                    <li> email - {user.email}</li>
                    <li> phone - {user.phone}</li>
                </ul>   
                <br/>
                <Link to='/edit'><button> edit details</button></Link>
        </div>
    )
}

export default Account