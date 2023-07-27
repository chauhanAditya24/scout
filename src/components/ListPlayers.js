import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetSpecificUsers } from '../actions/usersAction'

const ListPlayers = (props) => {
    const dispatch = useDispatch()

    const { city , sport , users } = useSelector((state) => {
        return {
            city: state.cities.city,
            sport: state.sports.sport,
            users: state.users.usersListCondition
        }
    })

    useEffect(() => {

        dispatch(startGetSpecificUsers({
            city,
            sport
        }))

    } , [dispatch,city,sport])
    
    console.log(' inside the grounds specific component ,' ,city,sport,users)

    return (
        <div>
            <h1> listing player : </h1>
            {
                users && (
                    <ul>
                        {
                            users.map((user) => {
                                return (
                                    <li key={user._id}> {user.username} </li>
                                )
                            })
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default ListPlayers