import React from 'react'
import {useState} from 'react'
import validator from 'validator'

const Login = (props) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ radio , setRadio ] = useState('')

    const [ formErrors , setFormErrors] = useState({})
    const errors = {}

    const fromValidations = () => {
        if(email.trim().length === 0){
            errors.email = 'email cannot be blank'
        }else if(!validator.isEmail(email.trim())){
            errors.email = 'invalid email'
        }

        if(password.trim().length === 0){
            errors.password = 'password cannot be blank'
        }

        if(radio === ''){
            errors.radio = 'must select one role'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fromValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const formData = {
                email,
                password,
                radio
            }
            console.log(formData)
        }else {
            setFormErrors(errors)
        }

        // console.log(props)
        // setEmail('')
        // setRadio('')
        // setPassword('')
        // props.history.push('/home')
    }

    const handleChange = (e) => {
        if(e.target.name === 'email') {
            setEmail(e.target.value)
        }else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }else if(e.target.name === 'userType'){
            setRadio(e.target.value)
        }
    }

    return (
        <div>
            <h1> Login </h1>
            <form onSubmit={handleSubmit}>
                <label> Email : </label>
                <input type="text" 
                    value={email} 
                    placeholder='enter your email' 
                    onChange={handleChange}
                    name='email'
                />
                {formErrors.email && <span style={{color: 'red'}}> {formErrors.email} </span> }
                <br/>
                <label> Password : </label>
                <input type='password' 
                    value={password} 
                    placeholder='enter password' 
                    onChange={handleChange}
                    name='password'
                />
                {formErrors.password && <span style={{color: 'red'}}> {formErrors.password} </span> }
                <br/>
                <input type='radio' 
                    name='userType' 
                    value='player' 
                    checked={radio === 'player'} 
                    onChange={handleChange}
                /> player  
                <input type='radio'
                    name='userType'
                    value='manager'
                    checked={radio === 'manager'}
                    onChange={handleChange}    
                /> manager<br/>
                {formErrors.radio && <span style={{color: 'red'}}> {formErrors.radio} <br/></span> }
                <input type='submit' value=' Login in'/>
            </form>

        </div>
    )
}

export default Login