import React, { useEffect} from "react"
import { startGetBookings, startGetManagerBookings } from '../actions/bookingsAction'
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { getCurrentUser } from "../actions/usersAction"
import { BASE_URL } from "../services/helper"
import Calendar from "./FullCalendar"

const BookingList = (props) => {
    const dispatch = useDispatch()

    // const [newBookings, setNewBookings] = useState([])

    const { bookings, user } = useSelector((state) => {
        return {
            bookings: state.bookings.booking,
            user: state.users.currentUser
        }
    })

    // useEffect(() => {

    //     const tempBookings = bookings.map((booking) => {
    //         const time = booking.date.split('-').reverse().join('-')
    //         // console.log(time)
    //         if (user.role !== 'player') {
    //             // console.log('userId', booking.userId)
    //             const userId = booking.userId
    //             axios.get(`${BASE_URL}/scout/findingUser/${userId}`, {
    //                 headers: {
    //                     'Authorization': localStorage.getItem('token')
    //                 }
    //             })
    //                 .then((res) => {
    //                     console.log('returned data from the findingUser Requrest', res)
    //                     const username = res.data.username
    //                     const phone = res.data.phone
    //                     console.log(`${booking.time} -${username}  - ${phone}`)
    //                     return { title: `${booking.time} - ${username} - ${phone}`, date: time }
    //                 })
    //                 .catch((err) => {
    //                     console.log('errrr', err)
    //                 })
    //         }
    //         return { title: `${booking.name} - ${booking.time}`, date: time }
    //     })

    //     setNewBookings(tempBookings)

    // }, [bookings, user.role])


    console.log('booking', bookings)
    console.log('users current:', user)

    useEffect(() => {
        dispatch(getCurrentUser())
        if (user.role === 'player') {
            dispatch(startGetBookings())
        } else if (user.role === 'manager') {
            dispatch(startGetManagerBookings())
        }
    }, [dispatch, user.role])

    const handleCancel = (id) => {
        axios.get(`${BASE_URL}/scout/bookings/cancel/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log('log to be removed ', res.data)
                alert('successfully canceled your booking , redirecting you to the home page !')
                // setTimeout(props.history.push('/'), 1000)
                props.history.push('/home')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="container" style={{ marginTop: '10px' }}>
            {bookings.length ? (
                <div>
                    {user.role === 'player' ? (
                        <div>
                            <h1 style={{ marginBottom: '20px' }}>You have {bookings.length} booking/s</h1>
                            <Calendar bookings={bookings} role={user.role} />
                            {/* {
                                bookings.map((booking) => {
                                    return (
                                        <div>
                                            <div style={{ border: '2px solid #ccc', backgroundColor: '#f0f0f0', width: '550px', paddingLeft: '20px', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginLeft: '50px', marginBottom: '20px' }} key={booking._id}>
                                                <h4> Ground name -: {booking.name}</h4>
                                                <h4> Date -: {booking.date}</h4>
                                                <h4>Time -: {booking.time}</h4>
                                                <h4>Address -: {booking.location} </h4>
                                                <h4>Booking fee -: {booking.price} per hour/slot</h4>
                                                <button onClick={() => {
                                                    handleCancel(booking._id)
                                                }} className="btn btn-lg btn-danger"> Cancel </button>
                                            </div>
                                        </div>
                                    )
                                })
                            } */}
                        </div>
                    ) : (
                        <div>
                            <h1>Listing your schedule - {bookings.length}</h1>
                            <Calendar bookings={bookings} role={user.role} />
                            {/* {
                                bookings.map((booking) => {
                                    return (
                                        <div style={{ border: '2px solid #ccc', backgroundColor: '#f0f0f0', width: '550px', paddingLeft: '20px', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', marginLeft: '50px', marginBottom: '20px' }} key={booking._id}>
                                            <h3> Ground name -: {booking.name}</h3>
                                            <h3> Date -: {booking.date}</h3>
                                            <h3>Time -: {booking.time}</h3>
                                            <h3>Booking fee -: {booking.price} per hour/slot</h3>
                                        </div>
                                    )
                                })
                            } */}
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ marginTop: '20px' }} className="alert alert-info container" >
                    <h3> No bookings yet . Please make your booking</h3>
                    <br />
                    Redircting you to the home page ...
                    {
                        setTimeout(() => {
                            props.history.push('/home')
                        }, '3000')
                    }
                </div>
            )}


        </div>
    )
}

export default BookingList