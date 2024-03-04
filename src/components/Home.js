import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import UsersDashboard from './UsersDashboard'
import { useSelector, useDispatch } from 'react-redux'
import { selectedCity } from '../actions/citiesAction'
import { selectedSport } from '../actions/sportsAction'
import { getCurrentUser, startGetAllFollowers, startGetAllFollowing, startGetRole, startGetUsers } from '../actions/usersAction'
import { startGetGrounds, startGetUsersGround } from '../actions/groundsAction'
import AdminPage from './AdminPage'
import '../css/home.css'
import '../css/heading.css'
import { tempBookingData } from '../actions/bookingsAction'
import { selectedChat, startGetAllChats } from '../actions/chatsAction'
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, Container, } from '@chakra-ui/react'
// import WhatsappLink from './WhatsappLink'
// import TestComponent from './TestComponent'

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(startGetFollowers())
        dispatch(startGetGrounds())
        dispatch(startGetUsers())
        dispatch(startGetAllFollowers())
        dispatch(startGetAllFollowing())
        dispatch(getCurrentUser())
        dispatch(startGetAllChats())
        dispatch(startGetRole())
        dispatch(startGetUsersGround())
        // dispatch(startGetFollowers())
        dispatch(startGetUsers())
        dispatch(selectedChat({}))
        dispatch(tempBookingData({ id: '100001' }))
    }, [dispatch])

    const { cities, city, sports, sport, role, grounds, followers, allUsers, groundList } = useSelector((state) => {
        const cities = state.cities.cities
        const city = state.cities.city
        const obj = {
            cities,
            city,
            sports: state.sports.sports,
            sport: state.sports.sport,
            role: state.users.role,
            grounds: state.grounds.ownersGround,
            followers: state.users.usersFollowers,
            allUsers: state.users.allUsers,
            groundList: state.grounds.groundsList
        }
        return obj
    })

    // console.log('role home component', role)

    // console.log('all users inside home component', groundList)

    const handleChangeCity = (e) => {
        dispatch(selectedCity(e.target.value))
    }

    const handleChangeSport = (e) => {
        dispatch(selectedSport(e.target.value))
    }

    return (
        <div>
            {
                role === 'admin' ? (
                    <div>
                        <AdminPage />
                    </div>
                ) : (

                    <>

                        <div style={{ marginTop: '50px' }}>
                            <h1 className='animated-heading' style={{ marginLeft: '570px' }}>Welcome to Scout !</h1>
                        </div>

                        {/* <h1>Home component</h1> */}
                        {role === 'manager' && <Link to='/grounds/register'><button style={{ borderRadius: '10px', marginRight: '10px' }} className='btn btn-primary'> Register your ground </button></Link>}
                        {role === 'manager' && <Link to='/grounds/user/edit'><button style={{ borderRadius: '10px' }} className='btn btn-primary'> Edit your ground </button></Link>}

                        {/* <span><Link to='/players'> Players </Link> | <Link to='/grounds/all'> Grounds </Link></span> */}
                        {/* <UsersDashboard /> */}

                        {/* // <TestComponent/> */}


                        {/* // <WhatsappLink/> */}

                        <div className='row'>

                            <div className='col col-md-2'
                                style={{ marginLeft: '120px', marginTop: '50px' }}
                            // style={{backgroundColor:'grey'}}
                            >
                                {/* <div style={{width:'200px', height:'120px' , display:'flex',alignItems:'center',justifyContent:'center'}}> */}
                                <Link to='/message'>
                                    <img
                                        height='150px'
                                        width='150px'
                                        src={require('../images/wired-lineal-981-consultation - Copy.gif')} />
                                    <button
                                        style={{ marginLeft: '25px' }}
                                        className='btn btn-success'>message</button>
                                </Link>
                                {/* </div> */}
                            </div>

                            <div style={{ marginTop: '50px', marginLeft: '120px' }} className='col col-md-8  home-box'>
                                <label className='form-label centre-align'> <h3>Select City and Sport</h3></label>
                                <select className='form-select' value={city} onChange={handleChangeCity}>
                                    <option>select the city</option>
                                    {
                                        cities.map((ele) => {
                                            return (
                                                <option key={ele._id}>{ele.city}</option>
                                            )
                                        })
                                    }
                                </select>
                                <br />
                                <select className='form-select' value={sport} onChange={handleChangeSport}>
                                    <option> select your sport </option>
                                    {
                                        sports.map((ele) => {
                                            return (
                                                <option key={ele._id}> {ele.name} </option>
                                            )
                                        })
                                    }
                                </select>


                                {
                                    (city && sport) && (
                                        <>
                                            <br />
                                            <div className='row'>
                                                <div className='col btn-align'>
                                                    <Link to='/list/players'><button className='btn btn-success'>players</button></Link>
                                                </div>
                                                <div className='col'>
                                                    <Link to='/list/specific/grounds'><button className='btn btn-success'> grounds</button></Link>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <div className='col col-md-2' style={{ marginRight: '100px', marginTop: '50px' }}>
                                <Link to='/followers'>
                                    <Container>
                                        <Stat
                                            // backgroundColor='grey'
                                            width='200px'
                                            height='160px'
                                        >
                                            <StatLabel paddingLeft='0px' fontSize='20px'>No of followers</StatLabel>
                                            <StatNumber paddingLeft='50px' marginBottom='0px'>{followers.length}</StatNumber>
                                            <img
                                                height='150px'
                                                width='150px'
                                                src={require('../images/wired-lineal-970-video-conference.gif')}
                                            />
                                        </Stat>
                                    </Container>
                                </Link>
                            </div>
                        </div>

                    </>


                )
            }
        </div>
    )
}

export default Home





//     < div style = {{ marginTop: '50px' }}>
//         <h1 className='animated-heading' style={{ marginLeft: '570px' }}>Welcome to Scout !</h1>
// </div >

//     {/* <h1>Home component</h1> */ }
// { role === 'manager' && <Link to='/grounds/register'><button style={{ borderRadius: '10px', marginRight: '10px' }} className='btn btn-primary'> Register your ground </button></Link> }
// { role === 'manager' && <Link to='/grounds/user/edit'><button style={{ borderRadius: '10px' }} className='btn btn-primary'> Edit your ground </button></Link> }

// {/* <span><Link to='/players'> Players </Link> | <Link to='/grounds/all'> Grounds </Link></span> */ }
// {/* <UsersDashboard /> */ }

// {/* // <TestComponent/> */ }


// {/* // <WhatsappLink/> */ }

// <div style={{ marginTop: '50px' }} className='home-box'>
//     <label className='form-label centre-align'> <h3>Select City and Sport</h3></label>
//     <select className='form-select' value={city} onChange={handleChangeCity}>
//         <option>select the city</option>
//         {
//             cities.map((ele) => {
//                 return (
//                     <option key={ele._id}>{ele.city}</option>
//                 )
//             })
//         }
//     </select>
//     <br />
//     <select className='form-select' value={sport} onChange={handleChangeSport}>
//         <option> select your sport </option>
//         {
//             sports.map((ele) => {
//                 return (
//                     <option key={ele._id}> {ele.name} </option>
//                 )
//             })
//         }
//     </select>


//     {
//         (city && sport) && (
//             <>
//                 <br />
//                 <div className='row'>
//                     <div className='col btn-align'>
//                         <Link to='/list/players'><button className='btn btn-primary'>players</button></Link>
//                     </div>
//                     <div className='col'>
//                         <Link to='/list/specific/grounds'><button className='btn btn-primary'> grounds</button></Link>
//                     </div>
//                 </div>
//             </>
//         )
//     }
// </div>