import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetSpecificGrounds } from '../actions/groundsAction'

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

    return(
        <div>
            <h1>Grounds near your city : </h1>
            {
                grounds && (
                    <ul>
                        {
                            grounds.map((ground) => {
                                return (
                                    <li key={ground._id}> {ground.name} </li>
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