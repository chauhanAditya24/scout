import React from 'react'
import { useDispatch } from 'react-redux'
import { updateLoggedIn } from '../actions/usersAction'
import '../css/logout.css'

const Logout = (props) => {
    const dispatch = useDispatch()

    const hanldeClickYes = (e) => {
        // alert('successfully logged out')
        localStorage.removeItem('token')
        dispatch(updateLoggedIn(false))
        props.history.push('/login')
        // console.log('props : ', props.history)
    }

    const handleClickNo = (e) => {
        // alert('diverting you to home page')
        props.history.push('/')
    }

    return (
        <div>
            <h5>are you sure you want to logout? </h5>
            <div className='row paddings'>
                <button className='btn btn-success btn-lg spacing' onClick={hanldeClickYes}> Yes </button><br />
                <button className='btn btn-danger btn-lg' onClick={handleClickNo}> Cancel</button>
            </div>
        </div>
    )
}

export default Logout