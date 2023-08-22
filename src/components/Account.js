import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentUser } from '../actions/usersAction'
const Account = (props) => {


    const dispatch = useDispatch()

    useEffect(() => {
        console.log('before useeffect')
        dispatch(getCurrentUser())
        console.log('after useEffect')
    }, [dispatch])

    const user = useSelector((state) => {
        return state.users.currentUser
    })

    const handleClick = () => {
        props.history.push('/')
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col md-6' style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <button onClick={handleClick} className='btn btn-primary btn-lg'> back</button>
                </div>
                <div className='col md-6'>
                    <h1> Your details: </h1>
                </div>

            </div>
            <div className='row'>
                <div className='col md-6'>
                    <img style={{borderRadius:'10px'}} width='500' height='500' src={`http://localhost:3088/images/${user.profilePicture}`} alt={user.username} />
                </div>
                <div className='col -md-6' style={{borderRadius:'10px', backgroundColor: '#f0f0f0', border: '2px solid #ccc', padding: '50px', marginRight: '150px' }}>
                    <h2> Username - {user.username}</h2>
                    <h2> Email - {user.email}</h2>
                    <h2> Phone - {user.phone}</h2>
                    <h2> City - {user.city}</h2>
                    <h2> Sport - {user.sport}</h2>
                    <h2> Bio - {user.bio}</h2>
                    <br />
                    <Link to='/edit'><button className='btn btn-primary'> edit details</button></Link>
                    <Link to='/delete/account'><button style={{marginLeft:'10px'}} className='btn btn-danger'> Permanently delete your account</button></Link>
                </div>
            </div>
            <Link to='/update/profilePicture'>
            <button style={{marginTop:'5px'}} className='btn btn-primary'> Update Profile Picture</button>
            </Link>
        </div>
    )
}

export default Account