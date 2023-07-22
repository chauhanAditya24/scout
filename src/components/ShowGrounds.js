import React from 'react'
import { useEffect } from 'react'
import { startGetGrounds, selectedGround } from '../actions/groundsAction'
import { useDispatch , useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ShowGrounds = (props) => {

    const grounds = useSelector((state) => {
        return state.grounds
    })

    const dispatch = useDispatch()

    useEffect( () => {

        dispatch(startGetGrounds())

    }, [dispatch])

    const handleClick = (ground) => {
        dispatch(selectedGround(ground))
    }

    return (
        <div>
            <h1> Grounds </h1>
            <ul>
                {
                    grounds.groundsList.map((ground) => {
                        return (
                            <li key={ground._id}> {ground.name} <Link to='/grounds/selectedGround'> <button onClick={() => {
                                handleClick(ground)
                            }}> show details </button> </Link> </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default ShowGrounds