import React, { useState } from 'react'
// import axios from 'axios'
import validator from 'validator'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { startPostUsers } from '../actions/usersAction'

const Register = (props) => {
    const [ name, setName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ mobile, setMobile ] = useState('')
    const [ check , setCheck ] = useState(false)
    const [ formErrors , setFormErrors ] = useState({})
    const errors = {}
    const dispatch = useDispatch()

    const resetAll = () => {
        setName('')
        setPassword('')
        setMobile('')
        setEmail('')
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
                phone: mobile
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
        }
    }

    return (
        <div>
            <h3> Register on scout</h3>
            <form onSubmit={handleFormSubmit}>
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
                <input type='checkbox'
                    name='checkbox'
                    checked={check}
                    onChange={handleChange}
                /> I accept the terms and conditions<br/>
                <input className='btn btn-primary' type='submit' disabled={!check} value='game on!!'/>
            </form>

            <span><Link to='/grounds/register'> register ground </Link></span>

        </div>
    )
}

export default Register