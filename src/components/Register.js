import React, { useEffect, useState } from 'react'
import validator from 'validator'
import { Link } from 'react-router-dom'
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
            <div style={{ marginBottom: '30px', marginLeft: '470px', width: '600px' }} className='form-box element2'>
                <div className='row'>
                    <div className='col col-md-10'>
                        <h3 className='alignment'> Register on scout</h3>
                    </div>
                    <div style={{ marginTop: '5px' }} className='col col-md-2'>
                        <Link to='/login'>Sign in</Link>
                    </div>
                </div>

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
                        <label style={{ marginLeft: '5px' }} className='form-check-label'>Player</label>
                    </div>
                    <div className='mb-3 form-check form-check-inline'>
                        <input type='radio'
                            name='userType'
                            value='manager'
                            checked={role === 'manager'}
                            onChange={handleChange}
                        /><label style={{ marginLeft: '5px' }} className='form-check-label'>Manager</label> {formErrors.role && <span style={{ color: 'red' }}><br /> {formErrors.role} </span>}<br />
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
                            <br />
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
                    <textarea name='bio' placeholder=' Eg : write something about the position you play' value={bio} onChange={handleChange} rows='4' cols='50'></textarea>
                    <br />
                    <input type='checkbox'
                        name='checkbox'
                        checked={check}
                        onChange={handleChange}
                    /> <Link data-bs-toggle="modal" data-bs-target="#staticBackdrop"> I accept the terms and condition </Link>
                    {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Launch static backdrop modal
                    </button> */}
                    <br />

                    <div className='alignment2'>
                        <br/>
                        <input className='btn btn-primary' type='submit' disabled={!check} value='Game On !' />
                    </div>
                </form>

                {/* <span><Link to='/grounds/register'> register ground </Link></span> */}


            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Terms & Condtions</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Welcome to Scout. By accessing and using the Website, you agree to comply with and be bound by these Terms and Conditions. Please read these terms carefully before using the Website.
                            <br/><br/>
                            <b>1. Acceptance of Terms : </b>
                            By accessing or using the Website, you agree to these Terms and Conditions and any additional guidelines or rules posted on the Website. If you do not agree with these terms, please do not use the Website.
                            <br/><br/>
                            <b>2. User Registration : </b>
                            Some areas of the Website may require you to register for an account. You agree to provide accurate and complete information during registration and to keep your account information up-to-date.
                            <br/><br/>
                            <b>3. Intellectual Property : </b>
                            The content, design, graphics, logos, and other materials on the Website are protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, modify, distribute, or display any of these materials without prior written consent from Scout.
                            <br/>
                            <br/>
                            <b> 4. Prohibited Activities : </b>
                            You agree not to:
                            - Use the Website for any unlawful or fraudulent purpose.
                            - Post, transmit, or distribute content that is offensive, defamatory, or violates the rights of others.
                            - Interfere with or disrupt the Website's functionality or security.
                            - Use any automated tools or techniques to access or use the Website.
                            <br/>
                            <br/>
                            <b> 5. Privacy Policy : </b>
                            Your use of the Website is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.
                            <br/>
                            <br/>
                            <b>6. Disclaimer of Warranties : </b>
                            The Website is provided on an "as-is" and "as available" basis. We make no warranties or representations about the accuracy, reliability, or suitability of the Website's content.
                            <br/>
                            <br/>
                            <b>7. Limitation of Liability : </b> 
                            Scout shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Website.
                            <br/>
                            <b>8. Modification of Terms : </b>
                            We reserve the right to modify or update these Terms and Conditions at any time without prior notice. Your continued use of the Website after any changes will signify your acceptance of the modified terms.
                            <br/>
                            <br/>
                            <b>9. Governing Law and Jurisdiction :</b>
                            These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of India.
                            <br/>
                            <br/>
                            <b> 10. Contact Information : </b>
                            If you have any questions or concerns about these Terms and Conditions, please contact us at scout@scout.com.
                            <br/>
                            <br/>
                            By using the Website, you agree to abide by these Terms and Conditions. If you do not agree with these terms, please discontinue your use of the Website.
                            <br/>
                            <br/>
                            Last Updated: [23-08-2023]

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" class="btn btn-primary">Understood</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register