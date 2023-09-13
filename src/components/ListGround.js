import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetSpecificGrounds, addSelectedGround } from '../actions/groundsAction'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/helper'

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

    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 6
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = grounds.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(grounds.length / recordsPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1)


    console.log(' inside the grounds specific component ,', city, sport, grounds)

    const handleClick = (id) => {
        const result = grounds.filter((ground) => {
            return ground._id === id
        })
        dispatch(addSelectedGround(result[0]))
    }

    const handlePrev = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage !== nPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    const changeCurrentPage = (value) => {
        setCurrentPage(value)
    }

    return (
        <div className='container'>
            {
                grounds.length > 0 ? (
                    <div className='container'>
                        <h1>Grounds in your city : </h1>
                        <div className='row'>
                            {grounds && (
                                records.map((ground) => {
                                    return (
                                        <div key={ground._id} className='card col-md-4 mb-4' style={{ backgroundColor: '#f5f5f5', border: '1px solid grey', width: '400px', marginLeft: '10px' }}>
                                            <img style={{ width: '380px', marginTop: '5px', height: '200px' }} className='card-img-top' src={`${BASE_URL}/images/${ground.groundPicture}`} alt={`${ground.name}`} />
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


                        {
                            grounds.length > 6 && (
                                <nav style={{ marginLeft: '500px' }}>
                                    <ul className='pagination'>
                                        <li className='page-item'>
                                            <a href='#' className='page-link' onClick={handlePrev}> Prev </a>
                                        </li>
                                        {
                                            numbers.map((num, i) => {
                                                return (
                                                    <li key={i} className={`page-item ${currentPage === num ? 'active' : ''}`}>
                                                        <a className='page-link' href="#" onClick={() => {
                                                            changeCurrentPage(num)
                                                        }}>{num}</a>
                                                    </li>
                                                )
                                            })
                                        }
                                        <li className='page-item'>
                                            <a href='#' className='page-link' onClick={handleNext}> Next </a>
                                        </li>
                                    </ul>
                                </nav>
                            )
                        }

                        <button className='btn btn-primary' onClick={() => {
                            props.history.push('/home')
                        }}> back </button>
                    </div>
                ) : (
                    <div style={{ marginTop: '20px' }} className='alert alert-info'>
                        No ground available for this sport/city.
                        <br /> Redirecting you to the home page ...
                        {
                            setTimeout(() => {
                                props.history.push('/home')
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