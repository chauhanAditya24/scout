import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import UsersDashboard from './UsersDashboard'
import { useSelector, useDispatch } from 'react-redux'
import { selectedCity } from '../actions/citiesAction'
import { selectedSport } from '../actions/sportsAction'
import { startGetRole } from '../actions/usersAction'
import { startGetUsersGround } from '../actions/groundsAction'
import '../css/home.css'
// import WhatsappLink from './WhatsappLink'
// import TestComponent from './TestComponent'

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetRole())
        dispatch(startGetUsersGround())
    }, [dispatch])

    const { cities, city, sports, sport, role, grounds } = useSelector((state) => {
        const cities = state.cities.cities
        const city = state.cities.city
        const obj = {
            cities,
            city,
            sports: state.sports.sports,
            sport: state.sports.sport,
            role: state.users.role,
            grounds: state.grounds.ownersGround,
        }
        return obj
    })

    console.log('role home component', role)

    const handleChangeCity = (e) => {
        dispatch(selectedCity(e.target.value))
    }

    const handleChangeSport = (e) => {
        dispatch(selectedSport(e.target.value))
    }

    return (
        <div>
            <h1>Home component</h1>
            {role === 'manager' && <Link to='/grounds/register'> register your ground <span>|</span></Link>}
            {grounds.length > 0 && <Link to='/grounds/user/edit'> edit your ground <span>|</span></Link>}

            <span><Link to='/players'> Players </Link> | <Link to='/grounds/all'> Grounds </Link></span>
            <UsersDashboard />
            
            {/* // <TestComponent/> */}


            {/* // <WhatsappLink/> */}

            <div className='home-box'>
                <label className='form-label centre-align'> <h3>Select City </h3></label>
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
                                    <Link to='/list/players'><button className='btn btn-primary'>players</button></Link>
                                </div>
                                <div className='col'>
                                    <Link to='/list/specific/grounds'><button className='btn btn-primary'> grounds</button></Link>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Home