import React, { useEffect } from "react"
import { startGetBookings, startGetManagerBookings } from '../actions/bookingsAction'
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { getCurrentUser } from "../actions/usersAction"

const BookingList = (props) => {
    const dispatch = useDispatch()

    const { bookings, user } = useSelector((state) => {
        return {
            bookings: state.bookings.booking,
            user: state.users.currentUser
        }
    })

    console.log('booking', bookings)
    console.log('users current:', user)

    useEffect(() => {
        dispatch(getCurrentUser())
        if (user.role === 'player') {
            dispatch(startGetBookings())
        } else if (user.role === 'manager') {
            dispatch(startGetManagerBookings())
        }
    }, [dispatch])

    const handleCancel = (id) => {
        axios.get(`http://localhost:3088/scout/bookings/cancel/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log('log to be removed ', res.data)
                alert('successfully canceled your booking , redirecting you to the home page !')
                // setTimeout(props.history.push('/'), 1000)
                props.history.push('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>

            {bookings.length ? (
                <div>
                    {user.role === 'player' ? (
                        <div>
                            <h1>Listing your booking/s - {bookings.length}</h1>
                            {
                                bookings.map((booking) => {
                                    return (
                                        <div style={{ border: '2px solid #ccc', backgroundColor: '#f0f0f0', width: '550px', paddingLeft: '20px', paddingTop: '10px', paddingBottom: '10px', marginLeft: '50px' }} key={booking._id}>
                                            <h3> Ground name -: {booking.name}</h3>
                                            <h3> Date -: {booking.date}</h3>
                                            <h3>Time -: {booking.time}</h3>
                                            <h3>Address -: {booking.location} </h3>
                                            <h3>Booking fee -: {booking.price} per hour/slot</h3>
                                            <button onClick={() => {
                                                handleCancel(booking._id)
                                            }} className="btn btn-lg btn-danger"> Cancel </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ):(
                        <div>
                            <h1>Listing your schedule - {bookings.length}</h1>
                            {
                                bookings.map((booking) => {
                                    return (
                                        <div style={{ border: '2px solid #ccc', backgroundColor: '#f0f0f0', width: '550px', paddingLeft: '20px', paddingTop: '10px', paddingBottom: '10px', marginLeft: '50px' }} key={booking._id}>
                                            <h3> Ground name -: {booking.name}</h3>
                                            <h3> Date -: {booking.date}</h3>
                                            <h3>Time -: {booking.time}</h3>
                                            <h3>Booking fee -: {booking.price} per hour/slot</h3>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h3> No bookings yet . Please make your booking</h3>
                </div>
            )}


        </div>
    )
}

export default BookingList