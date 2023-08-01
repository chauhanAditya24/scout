import React from 'react'
import {useState} from 'react'
import validator from 'validator'
import {useDispatch, useSelector} from 'react-redux'
import {startUserLogin} from '../actions/usersAction'

const Login = (props) => {
    // const loggedIn = useSelector((state) => {
    //     return state.users.loggedIn
    // })
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ formErrors , setFormErrors] = useState({})
    const errors = {}

    const dispatch = useDispatch()

    const fromValidations = () => {
        if(email.trim().length === 0){
            errors.email = 'email cannot be blank'
        }else if(!validator.isEmail(email.trim())){
            errors.email = 'invalid email'
        }

        if(password.trim().length === 0){
            errors.password = 'password cannot be blank'
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
            }
            console.log('inside the login component',formData)

            dispatch(startUserLogin(formData))
            // console.log(' result of dispatch ',res)
            props.history.push('/')
        }else {
            setFormErrors(errors)
        }

        // console.log(props)
        setEmail('')
        setPassword('')
    }

    const handleChange = (e) => {
        if(e.target.name === 'email') {
            setEmail(e.target.value)
        }else if(e.target.name === 'password'){
            setPassword(e.target.value)
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
                <input type='submit' value=' Login in'/>
            </form>

        </div>
    )
}

export default Login