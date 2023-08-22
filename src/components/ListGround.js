import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetSpecificGrounds, addSelectedGround } from '../actions/groundsAction'
import { Link } from 'react-router-dom'

const ListGround = (props) => {

    const dispatch = useDispatch()

    const { city, sport, grounds } = useSelector((state) => {
        return {
            city: state.cities.city,
            sport: state.sports.sport,
            grounds: state.grounds.groundsListCondition
        }
    })

    useEffect(() => {
        dispatch(startGetSpecificGrounds({
            city,
            sport
        }))
    }, [dispatch, city, sport])



    console.log(' inside the grounds specific component ,', city, sport, grounds)

    const handleClick = (id) => {
        const result = grounds.filter((ground) => {
            return ground._id === id
        })
        dispatch(addSelectedGround(result[0]))
    }

    return (
        <div className='container'>
            {
                grounds.length > 0 ? (
                    <div className='container'>
                        <h1>Grounds in your city : </h1>
                        <div className='row'>
                            {grounds && (
                                grounds.map((ground) => {
                                    return (
                                        <div key={ground._id} className='card col-md-4 mb-4' style={{ width: '20rem' }}>
                                            <img style={{width:'300px', marginTop:'5px' ,height:'200px'}} className='card-img-top' src={`http://localhost:3088/images/${ground.groundPicture}`} alt={`${ground.name}`} />
                                            <div className='card-body'>
                                                <h5 className='card-title'> {ground.name} </h5>
                                                <p className='card-text'> Location : {ground.location} <br />
                                                    Sport: {ground.sport} <br />
                                                    Timings: {ground.timings}
                                                </p>
                                                <Link to='/ground/details' onClick={() => {
                                                    handleClick(ground._id)
                                                }}><button className='btn btn-info'> show detials</button></Link>
                                            </div>
                                        </div>
                                    )
                                })
                            )}

                        </div>

                        <button className='btn btn-primary' onClick={() => {
                            props.history.push('/')
                        }}> back </button>
                    </div>
                ) : (
                    <div style={{ marginTop: '20px' }} className='alert alert-info'>
                        No ground available for this sport/city.
                        <br /> Redirecting you to the home page ... 
                        {
                            setTimeout(() => {
                                props.history.push('/')
                            }, '3000')
                        }
                    </div>
                )
            }
        </div>
    )
}


/*
{
                grounds && (
                    <ul>
                        {
                            grounds.map((ground) => {
                                return (
                                    <li key={ground._id}> {ground.name} <Link to='/ground/details' onClick={() => {
                                        handleClick(ground._id)
                                    }}><button className='btn btn-info'> show detials</button></Link> </li>
                                )
                            })
                        }
                    </ul>
                )
            }
*/








export default ListGround