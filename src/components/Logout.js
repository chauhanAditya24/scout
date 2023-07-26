import React from 'react'
import { useDispatch } from 'react-redux'
import { updateLoggedIn }from '../actions/usersAction'

const Logout = (props) =>{  
    const dispatch = useDispatch()

    const hanldeClickYes = (e) => {
        alert('successfully logged out')
        localStorage.removeItem('token')
        dispatch(updateLoggedIn(false))
        props.history.push('/login')
        // console.log('props : ', props.history)
    }

    const handleClickNo = (e) => {
        alert('diverting you to home page')
        props.history.push('/')
    }

    return (
        <div>
            <h5>are you sure you want to logout? </h5>
            <button onClick={hanldeClickYes}> yes </button><br/>
            <button onClick={handleClickNo}>no</button>
        </div>
    )
}

export default Logout