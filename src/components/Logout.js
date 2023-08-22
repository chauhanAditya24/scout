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
        <div className='container'>
            <div className='home-box' style={{marginTop:'50px',marginLeft:'370px' ,width: '500px', height: '300px' }}>
                <h5 style={{marginLeft:'80px'}}> Are you sure you want to logout? </h5><br/>
                <div className='row '>
                    <button className='btn btn-success btn-lg spacing' onClick={hanldeClickYes}> Yes </button><br />
                    <button className='btn btn-danger btn-lg' onClick={handleClickNo}> Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Logout