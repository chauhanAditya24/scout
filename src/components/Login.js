import React, { useEffect } from 'react'
import { useState } from 'react'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import { startGetRole, startGetUsers, updateLoggedIn } from '../actions/usersAction'
import axios from 'axios'
import '../css/loginPage.css'
import '../css/home.css'
import '../css/overlap.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { BASE_URL } from '../services/helper'

const Login = (props) => {
    // const loggedIn = useSelector((state) => {
    //     return state.users.loggedIn
    // })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [update, setUpdate] = useState(false)
    const [noUpdate, setNoUpdate] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    useEffect(() => {

        if (update) {
            const timeout = setTimeout(() => {
                setUpdate(false)
            }, 2000)

            setTimeout(() => {
                props.history.push('/home')
            }, 2000)

            return () => clearTimeout(timeout)
        }

        if (noUpdate) {
            const timeout = setTimeout(() => {
                setNoUpdate(false)
            }, 2000)

            setTimeout(() => {
                props.history.push('/')
            }, 2000)

            return () => clearTimeout(timeout)
        }

    }, [update, noUpdate, props.history])


    const dispatch = useDispatch()

    const fromValidations = () => {
        if (email.trim().length === 0) {
            errors.email = 'email cannot be blank'
        } else if (!validator.isEmail(email.trim())) {
            errors.email = 'invalid email'
        }

        if (password.trim().length === 0) {
            errors.password = 'password cannot be blank'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fromValidations()

        if (Object.keys(errors).length === 0) {
            setFormErrors({})
            const formData = {
                email,
                password,
            }
            console.log('inside the login component', formData)

            // dispatch(startUserLogin(formData))

            axios.post(`${BASE_URL}/scout/login`, formData)
                .then((res) => {
                    const result = res.data
                    if (result.hasOwnProperty('error')) {
                        setNoUpdate(true)
                        // alert(result.errors)
                        props.history.push('/')
                    } else {
                        setUpdate(true)
                        localStorage.setItem('token', result.token)
                        dispatch(updateLoggedIn(true))
                        dispatch(startGetUsers())
                        dispatch(startGetRole())
                    }
                })
                .catch((err) => {
                    console.log(err)
                })


            // console.log(' result of dispatch ',res)
            // props.history.push('/')
        } else {
            setFormErrors(errors)
        }

        // console.log(props)
        setEmail('')
        setPassword('')
    }

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmitClick = () => {
        setUpdate(false)
        setNoUpdate(false)
    }

    return (
        <div className='bottom-margin'>
            <div className='centre-container responsive-box wrapper component'>
                <div className='card-switch'>
                    <div className='title'> Log in</div>

                    {update && (
                        <div className="toast show position-fixed bottom-0 end-0 p-2 m-4 toast-available" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="toast-header">
                                <strong className="me-auto">Successfully logged in</strong>
                                <button type="button" className="btn-close" onClick={handleSubmitClick}></button>
                            </div>
                            <div className="toast-body">
                                Please wait we are logging you in.
                            </div>
                        </div>
                    )}

                    { noUpdate && (
                        <div className="toast show position-fixed bottom-0 end-0 p-2 m-4 toast-not-available" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="toast-header">
                                <strong className="me-auto">Invalid email or password</strong>
                                <button type="button" className="btn-close" onClick={handleSubmitClick}></button>
                            </div>
                            <div className="toast-body">
                                Please try again.
                            </div>
                        </div>
                    )}

                    <form className='flip-card__form' onSubmit={handleSubmit}>
                        <input className='flip-card__input' type="text"
                            value={email}
                            placeholder='enter your email'
                            onChange={handleChange}
                            name='email'
                        />
                        {formErrors.email && <span style={{ color: 'red' }}> {formErrors.email} </span>}
                        <input className='flip-card__input' type='password'
                            value={password}
                            placeholder='enter password'
                            onChange={handleChange}
                            name='password'
                        />
                        {formErrors.password && <span style={{ color: 'red' }}> {formErrors.password} </span>}
                        <input className='flip-card__btn' type='submit' value=' Login in' />

                        <Link to='/register'> Don't have a account ?. Join us </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login


/*


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

*/
