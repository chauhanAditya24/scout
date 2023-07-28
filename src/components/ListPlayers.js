import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetSpecificUsers , startGetSelectedPlayer } from '../actions/usersAction'
import { Link } from 'react-router-dom'

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


    const handleClick = (id) => {
        dispatch(startGetSelectedPlayer(id))
    }

    return (
        <div>
            <h1> listing player : </h1>
            {
                users && (
                    <ul>
                        {
                            users.map((user) => {
                                return (
                                    <li key={user._id}> {user.username} <Link to='/list/selected/player' onClick={() => {
                                        handleClick(user._id)
                                    }}><button>view detials</button></Link> </li>
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