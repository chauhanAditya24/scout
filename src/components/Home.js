import React from 'react'
import {Link} from 'react-router-dom'
import UsersDashboard from './UsersDashboard'
import { useSelector , useDispatch } from 'react-redux'
import { selectedCity }from '../actions/citiesAction'
import { selectedSport } from '../actions/sportsAction'
import TestComponent from './TestComponent'

const Home = () => {
    const dispatch = useDispatch()

    const { cities , city, sports , sport, role } = useSelector((state) => {
        const cities =  state.cities.cities
        const city = state.cities.city
        const obj = {
            cities,
            city,
            sports: state.sports.sports,
            sport : state.sports.sport,
            role : state.users.role
        } 
        return obj
    })

    console.log('city in home component', city)
    console.log('sports',sports)
    
    const handleChangeCity = (e) => {
        dispatch(selectedCity(e.target.value))
    }

    const handleChangeSport = (e) => {
        dispatch(selectedSport(e.target.value))
    }

    return (
        <div>
            <h1>Home component </h1>
            { role &&  <Link to='/grounds/register'> register your ground</Link>}
            <span> | <Link to='/players'> Players </Link> | <Link to='/grounds/all'> Grounds </Link></span>
            <UsersDashboard/>
            <TestComponent/>


            <select value={city} onChange={handleChangeCity}>
                <option>select the city</option>
                {
                    cities.map((ele) => {
                        return (
                            <option key={ele._id}>{ele.city}</option>
                        )
                    })
                }
            </select>
            <br/>
            <select value={sport} onChange={handleChangeSport}>
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
                    <br/>
                    <Link to='/list/players'><button>players</button></Link>
                    <Link to='/list/specific/grounds'><button> grounds</button></Link>
                    </>
                )
            }
        </div>
    )
}

export default Home