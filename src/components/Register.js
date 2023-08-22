import React, { useEffect, useState } from 'react'
import validator from 'validator'
// import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { startPostUsers } from '../actions/usersAction'
import { getCities } from '../actions/citiesAction'
import { startGetSports } from '../actions/sportsAction'
import '../css/registration.css'
import '../css/overlap.css'

const Register = (props) => {

    const dispatch = useDispatch()
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        dispatch(getCities())
        dispatch(startGetSports())

        if (update) {
            const timeout = setTimeout(() => {
                setUpdate(false)
            }, 2000)

            setTimeout(() => {
                props.history.push('/login')
            }, 2000)

            return () => clearTimeout(timeout)
        }
    }, [dispatch, update, props.history])

    const { cities, sports } = useSelector((state) => {
        return {
            cities: state.cities.cities,
            sports: state.sports.sports
        }
    })

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [check, setCheck] = useState(false)
    const [role, setRole] = useState('')
    const [city, setCity] = useState('')
    const [sport, setSport] = useState('')
    const [image, setImage] = useState('')
    const [bio, setBio] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    // console.log('image' , image)

    const resetAll = () => {
        setName('')
        setPassword('')
        setMobile('')
        setEmail('')
        setRole('')
        setCity('')
        setSport('')
        setImage('')
        setBio('')
    }

    const formValidation = () => {
        if (name.trim().length === 0) {
            errors.name = 'name cannot be blank'
        } else if (name.trim().split(' ').length > 1) {
            errors.name = 'name cannot contain spaces, you  can use special character instead'
        }

        if (email.trim().length === 0) {
            errors.email = 'email cannot be blank'
        } else if (!validator.isEmail(email.trim())) {
            errors.email = 'incorrect email'
        }

        if (mobile.trim().length === 0) {
            errors.mobile = 'mobile number cannot be blank'
        } else if (mobile.trim().length > 10 || mobile.trim().length < 10) {
            errors.mobile = 'please enter a valid mobile number'
        }

        if (password.trim().length === 0) {
            errors.password = 'password cannot be blank'
        } else if (password.trim().split(' ').length > 1) {
            errors.password = 'password cannot contain spaces'
        }

        if (role === '') {
            errors.role = 'must select one role'
        }

        if (city === '') {
            errors.city = 'city must be provided so that you can see the nearest players'
        }

        if (sport === '') {
            errors.sport = 'sport must be slected'
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        formValidation()

        if (Object.keys(errors).length === 0) {
            setFormErrors({})

            const formData = new FormData()
            formData.append('username', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('phone', mobile)
            formData.append('role', role)
            formData.append('city', city)
            formData.append('sport', sport)
            formData.append('profilePicture', image)
            formData.append('bio', bio)
            // const formData = {
            //     username: name,
            //     email: email,
            //     password: password,
            //     phone: mobile,
            //     role: role,
            //     city: city,
            //     sport: sport,
            //     profilePicture: image
            // }
            console.log(formData)

            dispatch(startPostUsers(formData))
            setUpdate(true)
            resetAll()
            // props.history.push('/login')
        } else {
            setFormErrors(errors)
        }
    }

    const handleChange = (e) => {
        if (e.target.name === 'mobile') {
            setMobile(e.target.value)
        } else if (e.target.name === 'name') {
            setName(e.target.value)
        } else if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        } else if (e.target.name === 'checkbox') {
            const ans = !check
            setCheck(ans)
        } else if (e.target.name === 'userType') {
            setRole(e.target.value)
        } else if (e.target.name === 'city') {
            setCity(e.target.value)
        } else if (e.target.name === 'sports') {
            setSport(e.target.value)
        } else if (e.target.name === 'image') {
            setImage(e.target.files[0])
        } else if (e.target.name === 'bio') {
            setBio(e.target.value)
        }
    }

    const handleSubmitClick = () => {
        setUpdate(false)
    }

    return (
        <div>
            <div className='form-box element2'>
                <h3 className='alignment'> Register on scout</h3>
                {update && (
                    <div className="toast show position-fixed bottom-0 end-0 p-2 m-4 toast-available" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <strong className="me-auto">Successfully registered your account</strong>
                            <button type="button" className="btn-close" onClick={handleSubmitClick}></button>
                        </div>
                    </div>
                )}
                <form onSubmit={handleFormSubmit} encType="multipart/form-data" >
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className='mb-3'>
                                <label className='form-label'>Name : </label>
                                <input type='text'
                                    className='form-control'
                                    id='name'
                                    name='name'
                                    value={name}
                                    onChange={handleChange}
                                    placeholder='enter username' />
                                {formErrors.name && <span style={{ color: 'red' }}> {formErrors.name} </span>}
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className='mb-3'>
                                <label className='form-label'>Email : </label>
                                <input type='text'
                                    name='email'
                                    className='form-control'
                                    value={email}
                                    onChange={handleChange}
                                    placeholder='enter email' />
                                {formErrors.email && <span style={{ color: 'red' }}> {formErrors.email} </span>}
                            </div>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Password : </label>
                        <input type='password'
                            name='password'
                            className='form-control'
                            value={password}
                            onChange={handleChange}
                            placeholder='enter your password' />
                        {formErrors.password && <span style={{ color: 'red' }}> {formErrors.password} </span>}
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Mobile : </label>
                        <input type='number'
                            name='mobile'
                            className='form-control'
                            value={mobile}
                            onChange={handleChange}
                            placeholder='enter mobile number' />
                        {formErrors.mobile && <span style={{ color: 'red' }}> {formErrors.mobile} </span>}
                    </div>
                    <div className='mb-3 form-check form-check-inline'>
                        <input type='radio'
                            name='userType'
                            value='player'
                            checked={role === 'player'}
                            onChange={handleChange}
                        />
                        <label className='form-check-label'>Player</label>
                    </div>
                    <div className='mb-3 form-check form-check-inline'>
                        <input type='radio'
                            name='userType'
                            value='manager'
                            checked={role === 'manager'}
                            onChange={handleChange}
                        /><label className='form-check-label'>manager</label> {formErrors.role && <span style={{ color: 'red' }}><br /> {formErrors.role} </span>}<br />
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <select className='form-select' value={city} name='city' onChange={handleChange}>
                                <option> select your city</option>
                                {
                                    cities.map((city) => {
                                        return (
                                            <option key={city._id}> {city.city} </option>
                                        )
                                    })
                                }
                            </select>{formErrors.city && <span style={{ color: 'red' }}> <br />{formErrors.city} </span>}
                            <select className='form-select' value={sport} name='sports' onChange={handleChange}>
                                <option>select your sport</option>
                                {
                                    sports.map((sport) => {
                                        return (
                                            <option key={sport._id}> {sport.name}</option>
                                        )
                                    })
                                }
                            </select>{formErrors.sport && <span style={{ color: 'red' }}><br />{formErrors.sport}</span>}
                            <br />
                        </div>
                    </div>

                    <input type='file' name='image' onChange={handleChange} />
                    <br />
                    <br />
                    <textarea name='bio' placeholder=' Eg : write something about the position you play' value={bio} onChange={handleChange} rows='4' cols='30'></textarea>
                    <br />
                    <input type='checkbox'
                        name='checkbox'
                        checked={check}
                        onChange={handleChange}
                    /> I accept the terms and conditions<br />
                    <br />
                    <div className='alignment2'>
                        <input className='btn btn-primary' type='submit' disabled={!check} value='game on!!' />
                    </div>
                </form>

                {/* <span><Link to='/grounds/register'> register ground </Link></span> */}


            </div>
        </div>
    )
}

export default Register