import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetSpecificUsers, startGetSelectedPlayer } from '../actions/usersAction'
import { Link } from 'react-router-dom'

const ListPlayers = (props) => {
    const dispatch = useDispatch()

    const { city, sport, users } = useSelector((state) => {
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

    }, [dispatch, city, sport])

    console.log(' inside the grounds specific component ,', city, sport, users)


    const handleClick = (id) => {
        dispatch(startGetSelectedPlayer(id))
    }

    let ans 
    if(users.length > 0){
        users.forEach((ele) => {
            if(ele._id === '64d37f0856414cc8e4453c6a'){
                ans = '1691582216979-testlogo.png'
                console.log('path to profile',ans)
            }
        })
    }

    return (
        <div className='container'>
            <h1> Players in your city: </h1>

            {users && ( <img src={`http://localhost:3088/images/${ans}`} alt='....'/>)}

            <div className='row'>
                {
                    users && (
                        users.map((user) => {
                            return (
                                <div key={user._id} className='card col-md-4 mb-4'>
                                    <div className='card-body'>
                                        <h5 className='card-title'>{user.username}</h5>
                                        <p className='card-text'>
                                           email: {user.email}
                                        </p>
                                        <Link to='/list/selected/player' onClick={() => {
                                    handleClick(user._id)
                                }}><button className='btn btn-info'>view detials</button></Link>

                                    </div>
                                </div>
                            )
                        })
                    )
                }
                </div>
                <button className='btn btn-primary' onClick={() => {
                    props.history.push('/')
                }}> back </button>
        </div>
    )
}

export default ListPlayers




// <div>
//             <h1> listing player : </h1>
//             {
//                 users && (
//                     <ul>
//                         {
//                             users.map((user) => {
//                                 return (
//                                     <li key={user._id}> {user.username} <Link to='/list/selected/player' onClick={() => {
//                                         handleClick(user._id)
//                                     }}><button>view detials</button></Link> </li>
//                                 )
//                             })
//                         }
//                     </ul>
//                 )
//             }
//             <button onClick={() => {
//                 props.history.push('/')
//             }}> back </button>
//         </div>