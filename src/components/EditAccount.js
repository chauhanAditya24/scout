import React from 'react'
import { useState, useEffect } from 'react'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { updateDetails } from '../actions/usersAction'
import { startGetSports } from '../actions/sportsAction'
import { getCities } from '../actions/citiesAction'

const EditAccount = (props) => {

    const dispatch = useDispatch()

    const { user, cities, sports } = useSelector((state) => {
        return {
            user: state.users.currentUser,
            cities: state.cities.cities,
            sports: state.sports.sports
        }
    })

    useEffect(() => {
        dispatch(getCities())
        dispatch(startGetSports())
    }, [dispatch])

    // console.log(user)

    const [username, setUsername] = useState(user.username)
    const [phone, setPhone] = useState(user.phone)
    const [email, setEmail] = useState(user.email)
    const [sport, setSport] = useState(user.sport)
    const [bio, setBio] = useState(user.bio)
    const [city, setCity] = useState(user.city)
    // const image = user.profilePicture
    // const [password, setPassword] = useState(user.password)
    // const [pass, setPass] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const formValidation = () => {
        if (username.trim().length === 0) {
            errors.name = 'name cannot be blank'
        } else if (username.trim().split(' ').length > 1) {
            errors.name = 'name cannot contain spaces, you  can use special character instead'
        }

        if (email.trim().length === 0) {
            errors.email = 'email cannot be blank'
        } else if (!validator.isEmail(email.trim())) {
            errors.email = 'incorrect email'
        }

        if (phone.trim().length === 0) {
            errors.mobile = 'mobile number cannot be blank'
        } else if (phone.trim().length > 10 || phone.trim().length < 10) {
            errors.mobile = 'please enter a valid mobile number'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        formValidation()

        if (Object.keys(errors).length === 0) {
            setFormErrors({})

            const formData = {
                username,
                email,
                phone,
                city,
                sport,
                bio
            }

            // if (pass.length === 0) {
            //     formData.password= password
            // } else {
            //     formData.password = pass
            // }

            // formData.append('username', username)
            // formData.append('email', email)
            // formData.append('phone', phone)
            // formData.append('city', city)
            // formData.append('city', sport)
            // formData.append('bio', bio)

            // const formData = {
            //     username,
            //     email,
            //     phone,
            // }

            console.log('updated from data', formData)

            dispatch(updateDetails(formData))

        }

    }

    const handleChange = (e) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value)
        } else if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'phone') {
            setPhone(e.target.value)
        } else if (e.target.name === 'city') {
            setCity(e.target.value)
        } else if (e.target.name === 'sports') {
            setSport(e.target.value)
        } else if (e.target.name === 'bio') {
            setBio(e.target.value)
        }// else if (e.target.name === 'password') {
        //     setPass(e.target.value)
        // }
    }

    const handleClick = (e) => {
        props.history.push('/')
    }

    return (
        <div>
            <div style={{ width: '500px', marginLeft: '300px' }}>
                <h1>Edit your account details</h1>
                <form onSubmit={handleSubmit} >
                    <label className='form-label'> Name: </label>
                    <input type='text'
                        className='form-control'
                        name='username'
                        value={username}
                        onChange={handleChange}
                    />{formErrors.name && <span style={{ color: 'red' }}>{formErrors.name}</span>}<br />
                    <label className='form-label'>Email:</label>
                    <input type='text'
                        className='form-control'
                        name='email'
                        value={email}
                        onChange={handleChange}
                    />{formErrors.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}<br />
                    <label className='form-label'>Mobile No:</label>
                    <input type='number'
                        className='form-control'
                        name='phone'
                        value={phone}
                        onChange={handleChange}
                    />{formErrors.mobile && <span style={{ color: 'red' }}>{formErrors.mobile}</span>}<br />
                    {/* <label className='form-label'> New Password:</label>
                    <input type='text'
                        name='password'
                        value={pass}
                        className='form-control'
                        placeholder='enter your new password'
                        onChange={handleChange}
                    /> */}

                    <label className='form-label'> City:</label>

                    <select className='form-select' value={city} name='city' onChange={handleChange}>
                        <option> select your city</option>
                        {
                            cities.map((city) => {
                                return (
                                    <option key={city._id}> {city.city} </option>
                                )
                            })
                        }
                    </select>{formErrors.city && <span style={{ color: 'red' }}>{formErrors.city}</span>}<br />
                    <label className='form-label'> enter the sport</label>
                    <select className='form-select' value={sport} name='sports' onChange={handleChange}>
                        <option>Sport</option>
                        {
                            sports.map((sport) => {
                                return (
                                    <option key={sport._id}> {sport.name}</option>
                                )
                            })
                        }
                    </select>{formErrors.sport && <span style={{ color: 'red' }}> {formErrors.sport}</span>}<br />

                    <label className='form-label'>Bio:</label>
                    <textarea className='form-control' rows='4' cols='30' name='bio' onChange={handleChange} value={bio}></textarea>
                    <br />

                    <input type='submit'
                        className='btn btn-success'
                        value='update details'
                    />
                    <button onClick={handleClick} style={{ marginLeft: '10px' }} className='btn btn-danger'> Cancel </button>

                </form>
                <br />
            </div>
        </div>
    )
}

export default EditAccount