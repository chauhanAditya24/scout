import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
// import { startGetUsersGround } from '../actions/groundsAction'
// import { startGetEditGroundDetials } from '../actions/groundsAction'
import { addEditGround } from '../actions/groundsAction'

const EditUsersGroundDetails = (props) => {

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(startGetUsersGround())
    // }, [dispatch])

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

    console.log('ownersGround',grounds)

    return (
        <div>
            <h1>Your ground: </h1>
            {
                grounds.map((ground) => {
                    return (
                        <div key={ground._id}>
                        <h3 >{ground.name} </h3>
                        <div className='row'>
                            <div className='col md-6'>
                                <img width='600' height='300' alt={ground.name} src={`http://localhost:3088/images/${ground.groundPicture}`}/>
                            </div>
                            <div className='col md-6' style={{backgroundColor: '#f0f0f0', border: '2px solid #ccc', padding: '50px', marginRight: '150px'}}>
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
                        }}><button className='btn btn-primary btn-lg'> edit ground details</button> </Link>
                        <button name='back' onClick={handleClickBack} className='btn btn-secondary btn-lg'> back </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default EditUsersGroundDetails