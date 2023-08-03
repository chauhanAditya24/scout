import React,{useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { startGetSports } from '../actions/sportsAction'
import { getCities } from '../actions/citiesAction'

const RegisterGround = (props) => {

    const { role, id , cities,sports} = useSelector((state) => {
        return {
            role: state.users.currentUser.role,
            id: state.users.userid,
            cities: state.cities.cities,
            sports: state.sports.sports
        }
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCities())
        dispatch(startGetSports())
    },[dispatch])

    const [ name, setName ] = useState('')
    const [ location , setLocation ] = useState('')
    const [ city, setCity ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ timings, setTimings ] = useState('')
    const [ slot , setSlot] = useState('')
    const [ sport , setSport ] = useState('')
    const [capacity, setCapacity] = useState('')
    const uid = id
    // client side validations
    const [ formErrors, setFormErrors] = useState({})
    const errors = {}

    const validation = () => {
        if(name.trim().length === 0){
            errors.name = 'name cannot be blank'
        }
        
        if(location.trim().length === 0){
            errors.location = 'loaction cannot be blank'
        }
        
        if(city.trim().length === 0){
            errors.city = 'city cannot be blank'
        }
        
        if(price.trim().length === 0){
            errors.price = 'price cannot be blank'
        }
        
        if(timings.trim().length === 0){
            errors.timings = 'timings cannot be blank'
        }

        if(slot === ''){
            errors.slot = 'slot must be provided so that you can see the nearest players'
        }

        if(sport === ''){
            errors.sport = 'sport must be slected'
        }

        if(capacity === '' ){
            errors.capacity = 'capacity cannot be blank'
        }else if(Number(capacity)  < 2){
            errors.capacity = 'capacity cannot be less than 2'
        }else if(Number(capacity) > 30){
            errors.capacity = 'max persons in the filed in 30'
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        validation()

        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const formData = {
                name,
                location,
                city,
                price,
                timings,
                sport,
                slotType:slot,
                userId:uid,
                capacity
            }
            console.log(formData)

            axios.post('http://localhost:3088/scout/grounds/register',formData)
            .then((res) => {
                console.log('registering the ground',res.data)
                const result = res.data
                if(result){
                    props.history.push('/')
                }
            })
            .catch((err) => {
                console.log(err)
            })

        }else{
            setFormErrors(errors)
        }
    }

    const handleChange = (e) => {
        if(e.target.name === 'name'){
            setName(e.target.value)
        }else if(e.target.name === 'location'){
            setLocation(e.target.value)
        }else if(e.target.name === 'city'){
            setCity(e.target.value)
        }else if(e.target.name === 'price'){
            setPrice(e.target.value)
        }else if(e.target.name === 'time'){
            setTimings(e.target.value)
        }else if(e.target.name === 'sports'){
            setSport(e.target.value)
        }else if(e.target.name === 'slot'){
            setSlot(e.target.value)
        }else if(e.target.name === 'capacity'){
            setCapacity(e.target.value)
        }
    }

    return (
        <div>
            <h1>register ground</h1>
            <form onSubmit={handleSubmit}>
                <label>Ground name : </label>
                <input type='text' 
                    name='name'
                    value={name}
                    onChange={handleChange}
                    placeholder='enter the gound name'
                />
                {formErrors.name && <span style={{color: 'red'}}> {formErrors.name} </span>}
                <br/>
                <label>ground's location</label>
                <input type='text'
                    name='location'
                    value={location}
                    onChange={handleChange}
                    placeholder='enter the address'
                />
                {formErrors.location && <span style={{color: 'red'}}> {formErrors.location}</span>}
                <br/>
                <label>price</label>
                <input type='text'
                    name='price'
                    value={price}
                    onChange={handleChange}
                    placeholder='enter the price per person'
                />
                {formErrors.price && <span style={{color: 'red'}}> {formErrors.price}</span>}
                <br/>
                <label> select your city </label>
                <select value={city} name='city' onChange={handleChange}>
                    <option> select your city</option>
                    {
                        cities.map((city) => {
                            return (
                                <option key={city._id}> {city.city} </option>
                            )
                        })
                    }
                </select>{formErrors.city && <span style={{color: 'red'}}>{formErrors.city}</span>}<br/>
                <label> enter the sport</label>
                <select value={sport} name='sports' onChange={handleChange}>
                    <option>select your sport</option>
                    {
                        sports.map((sport) => {
                            return (
                                <option key={sport._id}> { sport.name}</option>
                            )
                        })
                    }
                </select>{formErrors.sport && <span style={{color: 'red'}}> {formErrors.sport}</span>}<br/>


                <label>timings</label>
                <input type='text'
                    name='time'
                    value={timings}
                    onChange={handleChange}
                    placeholder='enter the timings'
                />
                {formErrors.timings && <span style={{color: 'red'}}> {formErrors.timings}</span>}
                <br/>
                
                <label> enter your timeframe</label>
                <input type='text' 
                    name='slot'
                    value={slot}
                    onChange={handleChange}
                    placeholder='enter the timeframe a single user can play min is 1 hour - max is 3 hours'
                />{formErrors.slot && <span style={{color: 'red'}}> {formErrors.slot}</span>}<br/>
                <label>max capacity</label>
                <input type='text'
                    name='capacity'
                    onChange={handleChange}
                    placeholder='both team combined max players'
                    value={capacity}
                />{formErrors.capacity && <span style={{color: 'red'}}>  {formErrors.capacity}</span>}<br/>


                <input type='submit' value='register ground'/>
            </form>
        </div>

    )
}


export default RegisterGround