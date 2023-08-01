import React, { useEffect, useState } from 'react'
import validator from 'validator'
// import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { startPostUsers } from '../actions/usersAction'
import { getCities } from '../actions/citiesAction'
import { startGetSports } from '../actions/sportsAction'

const Register = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCities())
        dispatch(startGetSports())
    },[dispatch])

    const { cities , sports } = useSelector((state) => {
        return {
            cities: state.cities.cities,
            sports: state.sports.sports
        }
    })

    const [ name, setName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ mobile, setMobile ] = useState('')
    const [ check , setCheck ] = useState(false)
    const [ role , setRole ] = useState('')
    const [ city , setCity] = useState('')
    const [ sport, setSport ] = useState('')
    const [ formErrors , setFormErrors ] = useState({})
    const errors = {}

    const resetAll = () => {
        setName('')
        setPassword('')
        setMobile('')
        setEmail('')
        setRole('')
        setCity('')
        setSport('')
    }

    const formValidation = () => {
        if(name.trim().length === 0){
            errors.name = 'name cannot be blank'
        }else if(name.trim().split(' ').length > 1){
            errors.name = 'name cannot contain spaces, you  can use special character instead'
        }

        if(email.trim().length === 0){
            errors.email = 'email cannot be blank'
        }else if(! validator.isEmail(email.trim())){
            errors.email = 'incorrect email'
        }

        if(mobile.trim().length === 0){
            errors.mobile = 'mobile number cannot be blank'
        }else if(mobile.trim().length >10 || mobile.trim().length < 10){
            errors.mobile = 'please enter a valid mobile number'
        }

        if(password.trim().length === 0){
            errors.password = 'password cannot be blank'
        }else if(password.trim().split(' ').length > 1){
            errors.password = 'password cannot contain spaces'
        }

        if(role === ''){
            errors.role = 'must select one role'
        }

        if(city === ''){
            errors.city = 'city must be provided so that you can see the nearest players'
        }

        if(sport === ''){
            errors.sport = 'sport must be slected'
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        formValidation()

        if(Object.keys(errors).length === 0){
            setFormErrors({})

            const formData = {
                username: name,
                email: email,
                password: password,
                phone: mobile,
                role:role,
                city:city,
                sport:sport
            }
            console.log(formData)

            dispatch(startPostUsers(formData))

            resetAll()
            props.history.push('/login')
        }else{
            setFormErrors(errors)
        }
    }

    const handleChange = (e) => {
        if(e.target.name === 'mobile'){
            setMobile(e.target.value)
        }else if(e.target.name === 'name'){
            setName(e.target.value)
        }else if(e.target.name === 'email'){
            setEmail(e.target.value)
        }else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }else if(e.target.name === 'checkbox'){
            const ans = !check
            setCheck(ans)
        }else if(e.target.name === 'userType'){
            setRole(e.target.value)
        }else if(e.target.name === 'city'){
            setCity(e.target.value)
        }else if(e.target.name === 'sports'){
            setSport(e.target.value)
        }
    }

    return (
        <div>
            <h3> Register on scout</h3>
            <form onSubmit={handleFormSubmit} >
                <label>Name : </label>
                <input type='text'
                    name='name'
                    value={name} 
                    onChange={handleChange} 
                    placeholder='enter username'/>   
                { formErrors.name && <span style={{color: 'red'}}> {formErrors.name} </span>}    
                <br/>
                <label>Email : </label>
                <input type='text'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    placeholder='enter email'/>
                    { formErrors.email && <span style={{color: 'red'}}> {formErrors.email} </span>}
                <br/>
                <label>Password : </label>
                <input type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    placeholder='enter your password'/>
                    { formErrors.password && <span style={{color: 'red'}}> {formErrors.password} </span>}
                <br/>
                <label>Mobile : </label>
                <input type='number'
                    name='mobile'
                    value={mobile}
                    onChange={handleChange}
                    placeholder='enter mobile number'/>
                    { formErrors.mobile && <span style={{color: 'red'}}> {formErrors.mobile} </span>}    
                <br/>
                <input type='radio'
                    name='userType'
                    value='player'
                    checked={role === 'player'}
                    onChange={handleChange}
                />player
                <input type='radio'
                    name='userType'
                    value='manager'
                    checked={role === 'manager'}
                    onChange={handleChange}
                />manager {formErrors.role && <span style={{color: 'red'}}><br/> {formErrors.role} </span>}<br/>
                
                <select value={city} name='city' onChange={handleChange}>
                    <option> select your city</option>
                    {
                        cities.map((city) => {
                            return (
                                <option key={city._id}> {city.city} </option>
                            )
                        })
                    }
                </select>{formErrors.city && <span style={{color: 'red'}}> <br/>{formErrors.city} </span>}
                <br/>
                <select value={sport} name='sports' onChange={handleChange}>
                    <option>select your sport</option>
                    {
                        sports.map((sport) => {
                            return (
                                <option key={sport._id}> { sport.name}</option>
                            )
                        })
                    }
                </select>{formErrors.sport && <span style={{color:'red'}}><br/>{formErrors.sport}</span>}
                <br/>
                <input type='checkbox'
                    name='checkbox'
                    checked={check}
                    onChange={handleChange}
                /> I accept the terms and conditions<br/>
                <input className='btn btn-primary' type='submit' disabled={!check} value='game on!!'/>
            </form>

            {/* <span><Link to='/grounds/register'> register ground </Link></span> */}

        </div>
    )
}

export default Register