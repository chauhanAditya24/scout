import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
// import { startGetUsersGround } from '../actions/groundsAction'
// import { startGetEditGroundDetials } from '../actions/groundsAction'
import { addEditGround } from '../actions/groundsAction'
import {startGetGroundPicture} from '../actions/groundsAction'
import axios from 'axios'
import '../css/overlap.css'

const EditUsersGroundDetails = (props) => {

    const dispatch = useDispatch()
    const [isDelete, setIsDelete] = useState(false)

    useEffect(() => {
        if (isDelete) {
            const timeout = setTimeout(() => {
                setIsDelete(false);
            }, 2000)

            setTimeout(() => {
                props.history.push('/')
            },2000)

            return () => clearTimeout(timeout);
        }
    }, [isDelete,props.history])



    const grounds = useSelector((state) => {
        return state.grounds.ownersGround
    })

    const handleClick = (id) => {
        const selectedGround = grounds.filter((ele) => {
            return id === ele._id
        })
        dispatch(addEditGround(selectedGround[0]))
    }

    const handleClickBack = (e) => {
        // console.log('name in clickback' , e.target.name)
        props.history.push('/')
    }

    const handleRemoveClick = (id) => {
        // console.log('handleRemove',id)
        axios.delete(`http://localhost:3088/scout/grounds/remove/${id}`)
            .then((res) => {
                console.log('removed data',res.data)
                setIsDelete(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // console.log('ownersGround', grounds)

    // const handleToastlClick = () => {
    //     setIsDelete(false)
    // }

    const handleGroundPicture = (id) => {
        const arr = grounds.filter((ele) => {
            return ele._id === id
        })
        console.log(arr)

        dispatch(startGetGroundPicture(id))
    }


    return (
        <div className='container'>
            {
                grounds.length > 0 ? (
                    <div>
                        <h1>Your ground/s : </h1>
                        <div>
                            {isDelete && (
                                <div className="toast show position-fixed bottom-0 end-0 p-2 m-4 toast-available" role="alert" aria-live="assertive" aria-atomic="true">
                                    <div className="toast-header">
                                        <strong className="me-auto">Successfully Deleted</strong>
                                        <button type="button" className="btn-close"></button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {
                            grounds.map((ground) => {
                                return (
                                    <div style={{ backgroundColor: '#E0EEE1', borderRadius: '10px', border: '2px solid #ccc', marginBottom: '50px' }} key={ground._id}>
                                        <div style={{ marginLeft: '50px' }}>
                                            <h3 >{ground.name} </h3>
                                            <div className='row'>
                                                <div className='col md-6'>
                                                    <img style={{ borderRadius: '10px' }} width='600' height='300' alt={ground.name} src={`http://localhost:3088/images/${ground.groundPicture}`} />
                                                </div>
                                                <div className='col md-6' style={{ borderRadius: '10px', backgroundColor: '#f0f0f0', border: '2px solid #ccc', padding: '50px', marginRight: '150px' }}>
                                                    <div>
                                                        <h2> Location : {ground.location} </h2>
                                                        <h2> Price : {ground.price} </h2>
                                                        <h2> Soprt :{ground.sport} </h2>
                                                        <h2> Timings : {ground.timings} </h2>
                                                        <h2> Ground's Capacity : {ground.capacity} </h2>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link to='/edit/ground/details' name='edit' onClick={() => {
                                                handleClick(ground._id)
                                            }}><button style={{ marginBottom: '20px', marginLeft: '10px' }} className='btn btn-primary btn-lg'>Edit ground details</button></Link>

                                            <Link to='/update/groundPicture' onClick={ () => {
                                                handleGroundPicture(ground._id)
                                            }}><button className='btn btn-primary btn-lg' style={{ marginBottom: '20px', marginLeft: '10px' }}> Update Ground Picture</button></Link>
                                            
                                            <button style={{ marginBottom: '20px', marginLeft: '10px' }} name='back' onClick={handleClickBack} className='btn btn-secondary btn-lg'>back</button>

                                            <button style={{ marginBottom: '20px', marginLeft: '10px' }} name='back' onClick={() => {
                                                handleRemoveClick(ground._id)
                                            }} className='btn btn-danger btn-lg'> De-register your Ground </button>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <h3> No ground registered. Please register your ground.</h3>
                )
            }
        </div>
    )
}

export default EditUsersGroundDetails