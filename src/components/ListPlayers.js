import React, { useEffect, useState } from 'react'
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

    //trying pagination
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 6
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    //

    let playersOnly
    if (users) {
        playersOnly = users.filter((ele) => {
            return ele.role === 'player'
        })
    }

    const records = playersOnly.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(playersOnly.length / recordsPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1)

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

    // let ans 
    // if(users.length > 0){
    //     users.forEach((ele) => {
    //         if(ele._id === '64d37f0856414cc8e4453c6a'){
    //             ans = '1691582216979-testlogo.png'
    //             console.log('path to profile',ans)
    //         }
    //     })
    // }

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
        <div>
            {
                users.length > 0 ? (
                    <div className='container'>
                        <div className='row'>
                            <div className='col col-md-11'>
                                <h1> Players in your city: </h1>
                            </div>
                            <div style={{ marginTop: '10px' }} className='col col-md-1'>
                                <button className='btn btn-primary' onClick={() => {
                                    props.history.push('/home')
                                }}> back </button>
                            </div>
                        </div>

                        {/* {users && ( <img src={`http://localhost:3088/images/${ans}`} alt='....'/>)} */}

                        <div className='row'>
                            {
                                users && (
                                    records.map((user) => {
                                        return (
                                            <div style={{ backgroundColor: '#f5f5f5', border: '1px solid grey', width: '430px', marginLeft: '10px' }} key={user._id} className='card col-md-4 mb-4'>
                                                <img style={{ marginTop: '7px' }} width='200' height='350' className='card-img-top' src={`http://localhost:3088/images/${user.profilePicture}`} alt={`${user.username}`} />
                                                <div className='card-body'>
                                                    <h5 className='card-title'>{user.username}</h5>
                                                    <p className='card-text'>
                                                        About me - {user.bio}
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
                        {
                            playersOnly.length > 6 && (
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
                        No player available for this sport/city.
                        <br /> Redirecting you to the home page
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

// <div className='container'>
//             <h1> Players in your city: </h1>

//             {/* {users && ( <img src={`http://localhost:3088/images/${ans}`} alt='....'/>)} */}

//             <div className='row'>
//                 {
//                     users && (
//                         playersOnly.map((user) => {
//                             return (
//                                 <div key={user._id} className='card col-md-4 mb-4'>
//                                     <img width='200' height='350' className='card-img-top' src={`http://localhost:3088/images/${user.profilePicture}`} alt={`${user.username}`}/>
//                                     <div className='card-body'>
//                                         <h5 className='card-title'>{user.username}</h5>
//                                         <p className='card-text'>
//                                            About me - {user.bio}
//                                         </p>
//                                         <Link to='/list/selected/player' onClick={() => {
//                                     handleClick(user._id)
//                                 }}><button className='btn btn-info'>view detials</button></Link>

//                                     </div>
//                                 </div>
//                             )
//                         })
//                     )
//                 }
//                 </div>
//                 <button className='btn btn-primary' onClick={() => {
//                     props.history.push('/')
//                 }}> back </button>
//         </div>