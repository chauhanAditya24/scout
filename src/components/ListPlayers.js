import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetSpecificUsers, startGetSelectedPlayer, addFollowing } from '../actions/usersAction'
import { Link } from 'react-router-dom'
import { updateFollowers } from '../actions/usersAction'
import FollowersData from './FollowersData'
import axios from 'axios'
import { BASE_URL } from '../services/helper'
import { useToast } from '@chakra-ui/react'

const ListPlayers = (props) => {
    const dispatch = useDispatch()
    const toast = useToast()

    const { city, usersFollower, sport, allUsers } = useSelector((state) => {
        return {
            city: state.cities.city,
            usersFollower: state.users.usersFollowers,
            sport: state.sports.sport,
            allUsers: state.users.allUsers.filter((ele) => {
                return ele.role === 'player'
            })
            // users: state.users.usersListCondition.filter((ele) => {
            //     return ele.role === 'player'
            // })
        }
    })

    const users = allUsers.filter((ele) => {
        return ele.sport === sport && ele.city === city
    })

    // console.log('followers  users check ', usersFollower)

    //for followers

    // const [followers, setFollowers] = useState(Array.isArray(usersFollower) ? [...usersFollower] : []);

    // const [followers, setFollowers] = useState([usersFollower])

    // useEffect(() => {

    // }, [followers])


    const [check, setCheck] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [enable1, setEnable1] = useState(true)
    const [enable2, setEnable2] = useState(true)
    // const [checkRev , setCheckRev]

    //trying pagination
    const [playersSearch, setPlayersSearch] = useState([...users])
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 6
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    //

    // let playersOnly
    // if (users) {
    //     playersOnly = users.filter((ele) => {
    //         return ele.role === 'player'
    //     })
    // }

    const records = playersSearch.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(playersSearch.length / recordsPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1)



    // useEffect(() => {

    //     dispatch(startGetSpecificUsers({
    //         city,
    //         sport
    //     }))

    // }, [dispatch, city, sport])

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

    const handleChange = (e) => {
        if (e.target.value.length > 1) {
            const searchChar = e.target.value.toLowerCase()
            console.log('users for new test', users)
            const res = users.filter((ele) => {
                return ele.username.toLowerCase().includes(searchChar)
            })
            console.log('search char wise in array ', res)
            setPlayersSearch(res)
        } else {
            setPlayersSearch(users)
        }
    }

    const handleCheckBox2 = (e) => {
        setCheck2(e.target.checked)
        setEnable1(!e.target.checked)

        if (e.target.checked) {
            const sortedUsers = [...playersSearch].sort((a, b) => {
                return b.username.localeCompare(a.username)
            })
            setPlayersSearch(sortedUsers)
        } else {
            setPlayersSearch(users)
        }
    }

    const handleCheckBox = (e) => {
        console.log(e.target.checked)
        setCheck(e.target.checked)
        setEnable2(!e.target.checked)
        if (e.target.checked) {
            const sortedUsers = [...playersSearch].sort((a, b) => {
                return a.username.localeCompare(b.username)
            })
            setPlayersSearch(sortedUsers)
        } else {
            setPlayersSearch(users)
        }
    }

    const handleFollow = (idAdd, username) => {
        const data = { id: idAdd }
        console.log('handling onClick for follow : ', data)
        const dataForFollowing = { id: idAdd , username: username}

        axios.put(`${BASE_URL}/scout/add/following`,dataForFollowing, {
            headers:{
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log('success' , res.data)
                dispatch(addFollowing(res.data))
            })
            .catch((err) => {
                console.log(err)
            })

        axios.put(`${BASE_URL}/scout/user/followers`, data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log('<--------------------------->', res.data)

                if (res.data.message === 'Already following') {
                    toast({
                        title: 'Already following.',
                        status: 'warning',
                        duration: 5000,
                        position: 'top',
                        isClosable: true
                    })
                } else if (res.data.message === undefined) {
                    toast({
                        title: 'failed following.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                        position: 'top'
                    })
                } else {
                    toast({
                        title: 'successfully following',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                        position: 'top'
                    })
                }
            })
            .catch((err) => {
                toast({
                    title: 'failed to follow.',
                    description: err.response.data,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top'
                })
            })


        // if(usersFollower.includes())

        // alert('id of user', user)
        // console.log('user check inside all the list players', users)

        // const follower = [...followers]
        // follower.push(user.username)
        // console.log()
        // setFollowers(follower)

        // dispatch(updateFollowers({ id: idAdd }))
        // if (followers.length === 0) {
        //     setFollowers([])
        // } else {
        //     const follower = [...followers]
        //     follower.push(user.username)

        //     setFollowers(follower)
        // }

    }

    return (
        <div>
            {
                users.length > 0 ? (
                    <div className='container'>
                        <div className='row'>
                            <div className='col col-md-4'>
                                <h1> Players in your city: </h1>
                            </div>
                            <div className='col col-md-3'>
                                <input
                                    type='search'
                                    onChange={handleChange}
                                    placeholder='  search by name'
                                    style={{ marginTop: '10px', borderRadius: '25px', border: '0.5px solid grey', marginRight: '10px', width: '250px' }}
                                />
                            </div>
                            <div className='col col-md-2'>
                                <FollowersData />
                            </div>
                            <div className='col col-md-2'>
                                <input
                                    type='checkbox'
                                    checked={check}
                                    disabled={!enable1}
                                    onChange={handleCheckBox}
                                    style={{ marginTop: '20px' }}
                                />
                                <label style={{ marginRight: '2px' }}> A - Z</label>
                                <input
                                    type='checkbox'
                                    checked={check2}
                                    onChange={handleCheckBox2}
                                    disabled={!enable2}
                                    style={{ marginTop: '20px' }}
                                />
                                <label> Z - A</label>
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
                                                <img style={{ marginTop: '7px' }} width='200' height='350' className='card-img-top' src={user.profilePicture} alt={`${user.username}`} />
                                                <div className='card-body'>
                                                    <h5 className='card-title'>{user.username}</h5>
                                                    <p className='card-text'>
                                                        About me - {user.bio}
                                                    </p>
                                                    <Link to='/list/selected/player' onClick={() => {
                                                        handleClick(user._id)
                                                    }}><button className='btn btn-info'>view detials</button></Link>
                                                    <button onClick={() => {
                                                        handleFollow(user._id, user.username)
                                                    }} style={{ marginLeft: '190px', backgroundColor: '#4FE76B', borderRadius: '8px', paddingLeft: '10px', paddingRight: '10px', paddingTop: '3px', paddingBottom: '5px', height: '35px' }} classname='btn btn-info' > follow </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                            }
                        </div>
                        {
                            users.length > 6 && (
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


// to check again
{/* <img style={{ marginTop: '7px' }} width='200' height='350' className='card-img-top' src={`http://localhost:3088/images/${user.profilePicture}`} alt={`${user.username}`} /> */}



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