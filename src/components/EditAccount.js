import React from 'react'
import {useState} from 'react'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { updateDetails } from '../actions/usersAction'

const EditAccount = (props) => {
    
    const dispatch = useDispatch()

    const user = useSelector((state) => {
        return state.users.currentUser
    })

    console.log(user)

    const [ username , setUsername ] = useState(user.username)
    const [ phone , setPhone ] = useState(user.phone)
    const [ email , setEmail ] = useState(user.email)
    const [formErrors , setFormErrors] = useState({})
    const errors = {}

    const formValidation = () => {
        if(username.trim().length === 0){
            errors.name = 'name cannot be blank'
        }else if(username.trim().split(' ').length > 1){
            errors.name = 'name cannot contain spaces, you  can use special character instead'
        }

        if(email.trim().length === 0){
            errors.email = 'email cannot be blank'
        }else if(! validator.isEmail(email.trim())){
            errors.email = 'incorrect email'
        }

        if(phone.trim().length === 0){
            errors.mobile = 'mobile number cannot be blank'
        }else if(phone.trim().length >10 || phone.trim().length < 10){
            errors.mobile = 'please enter a valid mobile number'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        formValidation()

        if(Object.keys(errors).length === 0){
            setFormErrors({})

            const formData = {
                username,
                email,
                phone,
            }

            // console.log('updated from data', formData)

            dispatch(updateDetails(formData))

        }

    }

    const handleChange = (e) => {
        if(e.target.name === 'username'){
            setUsername(e.target.value)
        }else if(e.target.name === 'email'){
            setEmail(e.target.value)
        }else if(e.target.name === 'phone'){
            setPhone(e.target.value)
        }
    }

    return (
        <div>
            <h1>edit account details</h1>
            <form onSubmit={handleSubmit}>
                <input type='text'
                    name='username'
                    value={username}
                    onChange={handleChange}
                />{formErrors.name && <span style={{color: 'red'}}>{formErrors.name}</span>}<br/>
                <input type='text'
                    name='email'
                    value={email}
                    onChange={handleChange}    
                />{formErrors.email && <span style={{color: 'red'}}>{formErrors.email}</span>}<br/>
                <input type='number'
                    name='phone'
                    value={phone}
                    onChange={handleChange}
                />{formErrors.mobile && <span style={{color: 'red'}}>{formErrors.mobile}</span>}<br/>
                <input type='submit'
                    value='update details'
                />
            </form>
        </div>
    )
}

export default EditAccount