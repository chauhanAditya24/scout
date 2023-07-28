import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetSpecificGrounds , addSelectedGround} from '../actions/groundsAction'
import {Link} from 'react-router-dom'

const ListGround = (props) => {
    
    const dispatch = useDispatch()

    const { city , sport , grounds } = useSelector((state) => {
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
    }, [dispatch,city,sport])



    console.log(' inside the grounds specific component ,' ,city,sport,grounds)

    const handleClick = (id) => {
        const result = grounds.filter((ground) => {
            return ground._id === id
        })
        dispatch(addSelectedGround(result[0]))
    }

    return(
        <div>
            <h1>Grounds near your city : </h1>
            {
                grounds && (
                    <ul>
                        {
                            grounds.map((ground) => {
                                return (
                                    <li key={ground._id}> {ground.name} <Link to='/ground/details' onClick={() => {
                                        handleClick(ground._id)
                                    }}><button> show detials</button></Link> </li>
                                )
                            })
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default ListGround