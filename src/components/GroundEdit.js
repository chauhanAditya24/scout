import axios from "axios"
import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { startGetSports } from '../actions/sportsAction'
import { getCities } from '../actions/citiesAction'
import '../css/overlap.css'

const GroundEdit = (props) => {

    const [update, setUpdate] = useState(false)
    const dispatch = useDispatch()

    const { ground, id, cities, sports } = useSelector((state) => {
        return {
            ground: state.grounds.groundToEdit,
            id: state.users.userid,
            cities: state.cities.cities,
            sports: state.sports.sports
        }
    })


    useEffect(() => {
        dispatch(getCities())
        dispatch(startGetSports())

        if (update) {
            const timeout = setTimeout(() => {
                setUpdate(false)
            }, 2000)

            setTimeout(() => {
                    props.history.push('/')
                }, 2000)

            return () => clearTimeout(timeout)
        }

    }, [dispatch, props.history, update])

    const [name, setName] = useState(ground.name)
    const [location, setLocation] = useState(ground.location)
    const [city, setCity] = useState(ground.city)
    const [price, setPrice] = useState(ground.price)
    const [timings, setTimings] = useState(ground.timings)
    const [slot, setSlot] = useState(ground.slotType)
    const [sport, setSport] = useState(ground.sport)
    const [capacity, setCapacity] = useState(ground.capacity)
    const uid = id
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const validation = () => {
        if (name.trim().length === 0) {
            errors.name = 'name cannot be blank'
        }

        if (location.trim().length === 0) {
            errors.location = 'loaction cannot be blank'
        }

        if (price.trim().length === 0) {
            errors.price = 'price cannot be blank'
        }

        if (timings.trim().length === 0) {
            errors.timings = 'timings cannot be blank'
        }

        if (slot === '') {
            errors.slot = 'slot must be provided so that you can see the nearest players'
        }

        if (capacity === '') {
            errors.capacity = 'capacity cannot be blank'
        } else if (Number(capacity) < 2) {
            errors.capacity = 'capacity cannot be less than 2'
        } else if (Number(capacity) > 30) {
            errors.capacity = 'max persons in the filed in 30'
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        validation()

        if (Object.keys(errors).length === 0) {
            setFormErrors({})
            const formData = {
                name,
                location,
                city,
                price,
                timings,
                sport,
                slotType: slot,
                userId: uid,
                capacity
            }
            console.log(formData)

            axios.put(`http://localhost:3088/scout/grounds/update/${ground._id}`, formData)
                .then((result) => {
                    if (result.data) {
                        // alert('data changed successfully')
                        setUpdate(true)
                        // props.history.push('/')
                    } else {
                        alert('some internal error please try again later')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })


        } else {
            setFormErrors(errors)
        }
    }

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        } else if (e.target.name === 'location') {
            setLocation(e.target.value)
        } else if (e.target.name === 'price') {
            setPrice(e.target.value)
        } else if (e.target.name === 'time') {
            setTimings(e.target.value)
        } else if (e.target.name === 'slot') {
            setSlot(e.target.value)
        } else if (e.target.name === 'capacity') {
            setCapacity(e.target.value)
        } else if (e.target.name === 'city') {
            setCity(e.target.value)
        } else if (e.target.name === 'sports') {
            setSport(e.target.value)
        }
    }

    const handleClick = (e) => {
        props.history.push('/')
    }

    const handleSubmitClick = () => {
        setUpdate(false)
    }

    return (
        <div style={{ width: '500px', marginLeft: '490px', marginTop: '18px', marginBottom: '18px', backgroundColor: '#f0f0f0', border: '2px solid #ccc', padding: '50px' }}>
            <h2>Edit ground details</h2>
            {update && (
                <div className="toast show position-fixed bottom-0 end-0 p-2 m-4 toast-available" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">Successfully updated details</strong>
                        <button type="button" className="btn-close" onClick={handleSubmitClick}></button>
                    </div>
                </div>
            )}
            <div>
                <form onSubmit={handleSubmit}>
                    <label className="form-label">Ground name : </label>
                    <input type='text'
                        className="form-control"
                        name='name'
                        value={name}
                        onChange={handleChange}
                        placeholder='enter the gound name'
                    />
                    {formErrors.name && <span style={{ color: 'red' }}> {formErrors.name} </span>}
                    <br />
                    <label className="form-label">Ground's Location</label>
                    <input type='text'
                        name='location'
                        className="form-control"
                        value={location}
                        onChange={handleChange}
                        placeholder='enter the address'
                    />
                    {formErrors.location && <span style={{ color: 'red' }}> {formErrors.location}</span>}
                    <br />
                    <label className="form-label">Price per slot</label>
                    <input type='text'
                        name='price'
                        className="form-control"
                        value={price}
                        onChange={handleChange}
                        placeholder='enter the price per person'
                    />
                    {formErrors.price && <span style={{ color: 'red' }}> {formErrors.price}</span>}
                    <br />

                    <label className="form-label">Timings</label>
                    <input type='text'
                        name='time'
                        className="form-control"
                        value={timings}
                        onChange={handleChange}
                        placeholder='enter the timings'
                    />
                    {formErrors.timings && <span style={{ color: 'red' }}> {formErrors.timings}</span>}
                    <br />

                    <label className="form-label"> Enter your timeframe in hour/s</label>
                    <input type='text'
                        name='slot'
                        className="form-control"
                        value={slot}
                        onChange={handleChange}
                        placeholder='enter the timeframe a single user can play min is 1 hour - max is 3 hours'
                    />{formErrors.slot && <span style={{ color: 'red' }}> {formErrors.slot}</span>}<br />
                    <label className="form-label">Max capacity</label>
                    <input type='text'
                        className="form-control"
                        name='capacity'
                        onChange={handleChange}
                        placeholder='both team combined max players'
                        value={capacity}
                    />{formErrors.capacity && <span style={{ color: 'red' }}>  {formErrors.capacity}</span>}<br />

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
                    <input className="btn btn-lg btn-success" type='submit' value='edit details' />
                    <button onClick={handleClick} style={{ marginLeft: '10px' }} className="btn btn-lg btn-danger"> Cancel </button>
                </form>
            </div>
        </div>
    )
}

export default GroundEdit