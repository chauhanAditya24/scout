import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../services/helper'
import { loadStripe } from '@stripe/stripe-js'
import Map from './Map'
import { tempBookingData } from '../actions/bookingsAction'
import '../css/overlap.css'
import '../css/booking.css'
// import { OpenStreetMapProvider} from 'nominatim-geocoder'
import { useHistory } from 'react-router-dom'
import Footer from './Footer'

const BookingPage = (props) => {
    const dispatch = useDispatch()
    // const history = useHistory()
    //geocoding api 
    // const openstreetmap = new OpenStreetMapProvider()
    const [coordinates, setCoordinates] = useState(null)
    console.log('coordinates', coordinates)
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [available, setAvailable] = useState(false)
    const [notAvailable, setNotAvailable] = useState(false)
    const [bookingAvailable, setBookingAvailable] = useState(false)
    const [bookingNotAvailable, setBookingNotAvailable] = useState(false)
    const [bookCheck , setBookCheck] = useState(false)
    const errors = {}

    const ground = useSelector((state) => {
        return state.grounds.specificGround
    })

    // console.log('***************************************GROUND******************')
    // console.log(ground)

    useEffect(() => {

        const fun = async () => {
            try {
                const base = 'https://nominatim.openstreetmap.org/search?'
                let location = ground.location + ' ' + ground.city
                const params = {
                    q: location,
                    format: 'json',
                    addressdetails: 1,
                    polygon_geojson: 0
                }

                const queryString = new URLSearchParams(params).toString()

                const result = await axios.get(`${base}${queryString}`)
                // console.log('+++++++++++++++++++++++++++++++++++')
                // console.log(result.data[0])

                const { lat, lon } = result.data[0]
                // console.log(lat,lon)
                setCoordinates([lat, lon])

            }
            catch (err) {
                console.log(err)
            }
        }

        fun()

    }, [ground])

    useEffect(() => {
        if (available) {
            const timeout = setTimeout(() => {
                setAvailable(false);
            }, 2000); // 3000 milliseconds = 3 seconds

            return () => clearTimeout(timeout);
        }

        if (notAvailable) {
            const timeout = setTimeout(() => {
                setNotAvailable(false);
            }, 2000); // 3000 milliseconds = 3 seconds

            return () => clearTimeout(timeout);
        }

        if (bookingNotAvailable) {
            const timeout = setTimeout(() => {
                setBookingNotAvailable(false)
            }, 2000)

            return () => clearTimeout(timeout)
        }

    }, [available, notAvailable, bookingNotAvailable]);


    const maxDays = () => {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return nextWeek.toISOString().split('T')[0]
    }

    // console.log('gound inside booking page',ground)

    const hanldeChange = (e) => {
        if (e.target.name === 'date') {
            setDate(e.target.value)
        } else if (e.target.name === 'startTime') {
            setStartTime(e.target.value)
        } else if (e.target.name === 'endTime') {
            setEndTime(e.target.value)
        }
    }

    // console.log('date' , date)
    // console.log('timings ' ,startTime,endTime)

    const checkTimeDiff = () => {
        const start = startTime.split(':')
        const end = endTime.split(':')

        const minStart = Number(start[0]) * 60 + Number(start[1])
        const minEnd = Number(end[0]) * 60 + Number(end[1])

        if (minStart > minEnd) {
            return {
                message: 'Start time cannot be greater than End time'
            }
        }

        if ((minEnd - minStart) < 60) {
            return {
                message: 'Slot has to be a minimum of 1 hour'
            }
        }

        // const start = startTime.slice(0, 2)
        // const end = endTime.slice(0, 2)
        // console.log('start', start)
        // console.log('end', end)
        // console.log(endTime - startTime)
        // return end - start
        return 1
    }

    const formValidation = () => {
        if (date.length === 0) {
            errors.date = 'date cannot be blank'
        }
        if (startTime.length === 0) {
            errors.startTime = 'start time cannot be blank'
        }
        if (endTime.length === 0) {
            errors.endTime = 'end time cannot be blank'
        }

        if (startTime.length !== 0 && endTime.length !== 0) {
            const diff = checkTimeDiff()
            if (typeof diff === 'object') {
                errors.time = diff.message
            }
        }
    }

    //payment method new one

    // const makePayment = async (data) => {
    //     try {
    //         const stripe = await loadStripe('pk_test_51OPQrWSCsP2MbOhT82Il1vqqebcmSAweSnxmleh4UrBZwIfdo7IVvXh92Ju10pt3uFhSU6c4wmNwMbFxDczfdwR500zPvhV4Kc'); // Replace with your actual Stripe public key
    //         const response = await axios.post(`${BASE_URL}/scout/create-checkout-session`, data);
    //         const session = response.data;
    //         const result = await stripe.redirectToCheckout({ sessionId: session.id });
    //         if (result.error) {
    //             console.error('Error redirecting to checkout:', result.error);
    //         }
    //     } catch (error) {
    //         console.error('Error making payment:', error);
    //     }
    // }

    //


    //payment method 
    const makePayment = async (data) => {
        const stripe = await loadStripe('pk_test_51OPQrWSCsP2MbOhT82Il1vqqebcmSAweSnxmleh4UrBZwIfdo7IVvXh92Ju10pt3uFhSU6c4wmNwMbFxDczfdwR500zPvhV4Kc')

        const headers = {
            'Content-Type': 'application/json'
        }
        const response = await fetch(`${BASE_URL}/scout/create-checkout-session`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })

        const session = await response.json()

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        })

        if (result.error) {
            console.log(result.error)
        } else {
            // history.push('/payment/success')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const arr = date.split('-').reverse()
        const drr = arr.join('-')
        // console.log(typeof drr)
        const time = startTime + '-' + endTime
        const data = {
            date: drr,
            time,
            groundId: ground._id,
            price: ground.price,
            name: ground.name,
            location: ground.location,
            groundPicture: ground.groundPicture,
            managerId: ground.userId
        }

        //adding this to the state so it can be access in payment success component
        dispatch(tempBookingData(data))
        const sendData = JSON.stringify(data)
        console.log('send data stringified', sendData)
        localStorage.setItem('booking', JSON.stringify(data))

        //payment integration
        makePayment(data)

        // axios.post(`${BASE_URL}/scout/ground/book`, data, {
        //     headers: {
        //         'authorization': localStorage.getItem('token')
        //     }
        // })
        //     .then((res) => {
        //         console.log(res.data)
        //         // console.log('successfully booked the venue')
        //         if (res.data.msg === 'not available') {
        //             setBookingNotAvailable(true)
        //         } else {
        //             setBookingAvailable(true)
        //             const timeout = setTimeout(() => {
        //                 props.history.push('/home')
        //             }, 3000); // 3000 milliseconds = 3 seconds

        //             return () => clearTimeout(timeout);
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }

    const handleClick = (e) => {
        e.preventDefault()
        formValidation()

        if (Object.keys(errors).length === 0) {
            setFormErrors({})
            // console.log('date to check' , date)
            const arr = date.split('-').reverse()
            // console.log(arr)
            const drr = arr.join('-')
            // console.log(drr)
            const time = startTime + '-' + endTime
            console.log('time check ', time)
            const data = {
                date: drr,
                time,
                groundId: ground._id
            }

            console.log('data check', data)

            axios.post(`${BASE_URL}/scout/ground/availability`, data, {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            })
                .then((res) => {
                    console.log('data msg received', res.data)
                    // setAvailable(true)
                    if (res.data.msg === 'available') {
                        setAvailable(true)
                        setBookCheck(true)

                    } else if (res.data.msg === 'not available') {
                        setNotAvailable(true)
                        setBookCheck(false)
                    }
                    // alert(`the slot is ${res.data.msg}`)
                })
                .catch((err) => {
                    console.log(err)
                })

        } else {
            setFormErrors(errors)
        }

        // // console.log('date to check' , date)
        // const arr = date.split('-').reverse()
        // // console.log(arr)
        // const drr = arr.join('-')
        // // console.log(drr)
        // const time = startTime + '-' + endTime
        // console.log('time check ', time)
        // const data = {
        //     date: drr,
        //     time,
        //     groundId: ground._id
        // }

        // console.log('data check', data)

        // axios.post(`http://localhost:3088/scout/ground/availability`, data, {
        //     headers: {
        //         'authorization': localStorage.getItem('token')
        //     }
        // })
        //     .then((res) => {
        //         console.log('data msg received', res.data)
        //         alert(`the slot is ${res.data.msg}`)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }

    const handleModalClick = () => {
        setAvailable(false)
        setNotAvailable(false)
    }

    const handleSubmitClick = () => {
        setBookingAvailable(false)
        setBookingNotAvailable(false)
    }

    return (
        <>
            <div className='container' style={{ paddingTop: '10px' }}>
                <button style={{ marginLeft: '80rem' }} className='btn btn-primary' onClick={() => {
                    props.history.push('/list/specific/grounds')
                }}> Back </button>
                <div className='container'>
                    {available && (
                        <div className="toast show position-fixed bottom-0 end-0 p-2 m-4 toast-available" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="toast-header">
                                <strong className="me-auto">Slot is available for booking!</strong>
                                <button type="button" className="btn-close" onClick={handleModalClick}></button>
                            </div>
                            {/* <div className="toast-body">
                            Slot is available for booking!
                        </div> */}
                        </div>
                    )}

                    {notAvailable && (
                        <div className="toast show position-fixed bottom-0 end-0 p-2 m-4 toast-not-available" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="toast-header">
                                <strong className="me-auto">Slot is not available for booking.</strong>
                                <button type="button" className="btn-close" onClick={handleModalClick}></button>
                            </div>
                            {/* <div className="toast-body"> */}
                            {/* Slot is not available for booking. */}
                            {/* </div> */}
                        </div>
                    )}

                    {bookingNotAvailable && (
                        <div className="toast show position-fixed bottom-0 end-0 p-2 m-4 toast-not-available" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="toast-header">
                                <strong className="me-auto">Slot is not available for booking.</strong>
                                <button type="button" className="btn-close" onClick={handleSubmitClick}></button>
                            </div>
                            <div className="toast-body">
                                Redirecting you to the home page...
                            </div>
                        </div>
                    )}

                    {bookingAvailable && (
                        <div className="toast show position-fixed bottom-0 end-0 p-2 m-4 toast-available" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="toast-header">
                                <strong className="me-auto">Successfully booked the venue.</strong>
                                <button type="button" className="btn-close" onClick={handleSubmitClick}></button>
                            </div>
                        </div>
                    )}

                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <h1 style={{ fontFamily: 'cursive' }}>{ground.name}</h1>
                        <img style={{ borderRadius: '10px' }} alt='...' width='800' height='500' src={ground.groundPicture} />
                        <br />
                        <div style={{ paddingBottom: '10px', paddingLeft: '30px', fontFamily: 'cursive', paddingTop: '10px', border: '2px solid #ccc', backgroundColor: '#f0f0f0', width: '500px', width: '650px', borderRadius: '10px' }}>
                            <h3>Timings :- {ground.timings}.</h3>
                            <h3>Address :- {ground.location}.</h3>
                            <h3>Price :- {ground.price} /- per slot</h3>
                            <h3>Capacity :- {ground.capacity} person.</h3>
                            <h3>Sport :- {ground.sport}</h3>
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div className='container form-box' style={{ borderRadius: '10px', fontFamily: 'cursive', marginLeft: '250px', marginTop: '55px' }}>
                            <form onSubmit={handleSubmit}>
                                <label className='form-label'>Select date</label>
                                <input className='form-control' type='date' name='date' min={new Date().toISOString().split('T')[0]} max={maxDays()} value={date} onChange={hanldeChange} />{formErrors.date && <span style={{ color: 'red' }}>{formErrors.date}</span>}<br />
                                <label className='form-label'>Select time</label><br />
                                <label className='form-label'>Start time</label>
                                <input className='form-control' type='time' name='startTime' value={startTime} onChange={hanldeChange} />
                                {formErrors.startTime && <span style={{ color: 'red' }}>{formErrors.startTime} <br /></span>}
                                <label className='form-label'>End time</label>
                                <input className='form-control' type='time' name='endTime' value={endTime} onChange={hanldeChange} />
                                {formErrors.endTime && <span style={{ color: 'red' }}>{formErrors.endTime}<br /><br /></span>}
                                {formErrors.time && <span style={{ color: 'red' }}>{formErrors.time}<br /><br /></span>}
                                <div style={{ alignItems: 'centre', paddingLeft: '50px' }}>
                                    <br />
                                    <button className='btn btn-secondary btn-lg' onClick={handleClick}> check availablity </button>
                                </div>
                                <br />
                                <input className='form-control btn btn-success btn-lg' type='submit' value='Book' disabled={!bookCheck} />
                            </form>
                        </div>
                        {/* <br /> */}
                        {/* <div style={{ borderRadius: '10px', paddingBottom: '10px', paddingLeft: '20px', paddingTop: '10px', marginTop: '0px', marginBottom: '25px', border: '2px solid #ccc', backgroundColor: '#f0f0f0', width: '815px' }}>
                        <h3>Timings :- {ground.timings}.</h3>
                        <h3>Address :- {ground.location}.</h3>
                        <h3>Price :- {ground.price} /- per slot</h3>
                        <h3>Capacity :- {ground.capacity} person.</h3>
                        <h3>Sport :- {ground.sport}</h3>
                    </div> */}
                    </div>


                    {/* <div style={{ border: '2px solid #6F6F6F'}}>
                        <h4>Timings<br />{ground.timings}</h4>
                    </div>
                    <div style={{ border: '2px solid #6F6F6F', marginTop: '10px' }}>
                        <h3>location -: {ground.location}</h3>
                    </div>

                    <h3>price -: {ground.price}</h3> */}
                    <div style={{ marginTop: '25px', marginBottom: '25px' }}>
                        {coordinates === null ? (<p style={{ fontFamily: 'cursive' }}>Please wait ... </p>) : (<Map coordinates={coordinates} name={ground.name} />)}
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default BookingPage

{/* <img style={{ borderRadius: '10px' }} alt='...' width='800' height='500' src={`${BASE_URL}/images/${ground.groundPicture}`} /> */}