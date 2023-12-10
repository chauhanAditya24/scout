import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from '../services/helper'
import { useEffect } from "react";
import '../css/reactCalendar.css'

const Calendar = (props) => {

    const { bookings, role } = props
    const [newBookings, setNewBookings] = useState([])

    useEffect(() => {
        const fetchUserData = async (booking) => {
            console.log('booking gpt , ', booking)
            const time = booking.date.split('-').reverse().join('-');
            const userId = booking.userId;

            try {
                const response = await axios.get(`${BASE_URL}/scout/findingUser/${userId}`, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });

                const username = response.data.username;
                const phone = response.data.phone;

                return { title: `${booking.time} - ${username} \n - ${phone}`, date: time };
            } catch (error) {
                console.log('Error fetching user data:', error);
                return null;
            }
        };

        const updateBookings = async () => {
            let tempBookings = [];

            if (role === 'player') {
                tempBookings = bookings.map((booking) => ({
                    title: `${booking.name} - ${booking.time}`,
                    date: booking.date.split('-').reverse().join('-')
                }));
            } else if (role === 'manager') {
                tempBookings = await Promise.all(bookings.map(fetchUserData));
                tempBookings = tempBookings.filter((booking) => booking !== null);
            }

            setNewBookings(tempBookings);
        };

        updateBookings();
    }, [bookings, role]);


    // useEffect(() => {

    //     if (role === 'player') {
    //         const tempBookings = bookings.map((booking) => {
    //             const time = booking.date.split('-').reverse().join('-')
    //             return { title: `${booking.name} - ${booking.time}`, date: time }
    //         })
    //         setNewBookings(tempBookings)
    //     } else if (role === 'manager') {
    //         const tempBookings = [] 
    //         bookings.forEach((booking) => {
    //             const time = booking.date.split('-').reverse().join('-')
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
    //                     tempBookings.push( { title: `${booking.time} - ${username} - ${phone}`, date: time })
    //                 })
    //                 .catch((err) => {
    //                     console.log('errrr', err)
    //                 })
    //         })
    //         setNewBookings(tempBookings)
    //     }

    // const tempBookings = bookings.map((booking) => {
    //     const time = booking.date.split('-').reverse().join('-')
    //     // console.log(time)
    //     if (role !== 'player') {
    //         // console.log('userId', booking.userId)
    //         const userId = booking.userId
    //         axios.get(`${BASE_URL}/scout/findingUser/${userId}`, {
    //             headers: {
    //                 'Authorization': localStorage.getItem('token')
    //             }
    //         })
    //             .then((res) => {
    //                 console.log('returned data from the findingUser Requrest', res)
    //                 const username = res.data.username
    //                 const phone = res.data.phone
    //                 console.log(`${booking.time} -${username}  - ${phone}`)
    //                 return { title: `${booking.time} - ${username} - ${phone}`, date: time }
    //             })
    //             .catch((err) => {
    //                 console.log('errrr', err)
    //             })
    //     }
    //     return { title: `${booking.name} - ${booking.time}`, date: time }
    // })


    // }, [bookings, role])

    // console.log('bookings check recent', bookings)

    // const newBookings = bookings.map((booking) => {
    //     const time = booking.date.split('-').reverse().join('-')
    //     console.log(time)
    //     if (role === 'player') {
    //         return { title: `${booking.name} - ${booking.time}`, date: time }
    //     } else {
    //         console.log('userId', booking.userId)
    //         const userId = booking.userId
    //         axios.get(`${BASE_URL}/scout/findingUser/${userId}`, {
    //             headers: {
    //                 'Authorization': localStorage.getItem('token')
    //             }
    //         })
    //             .then((res) => {
    //                 console.log('returned data from the findingUser Requrest', res)
    //                 const username = res.data.username
    //                 const phone = res.data.phone
    //                 return { title: `${booking.time - username - phone}`, date: time }
    //             })
    //             .catch((err) => {
    //                 console.log('errrr', err)
    //             })
    //         return { title: `${booking.time}`, date: time }
    //     }
    // })

    console.log('bookings inside the calendar', newBookings)
    return (
        <div style={{ marginBottom: '20px' }}>
            {newBookings.length > 0 ? (
                <div className="custom-full-calendar-wrapper">
                    <FullCalendar
                        // height='700px'
                        plugins={[dayGridPlugin]}
                        initialView='dayGridMonth'
                        events={newBookings}
                    />
                </div>
            ) : (
                <p>Please wait your schedule is loading</p>
            )}
        </div>
    )
}

export default Calendar