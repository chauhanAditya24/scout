import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../css/booking.css'

const BookingPage = (props) => {

    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    const ground = useSelector((state) => {
        return state.grounds.specificGround
    })

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

    const handleSubmit = (e) => {
        e.preventDefault()

        const arr = date.split('-').reverse()
        const drr = arr.join('-')
        // console.log(typeof drr)
        const time = startTime + '-' + endTime
        const data = {
            date: drr,
            time,
            groundId: ground._id
        }

        axios.post(`http://localhost:3088/scout/ground/book`, data, {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data)
                console.log('successfully booked the venue')
            })
            .catch((err) => {
                console.log(err)
            })


    }

    const handleClick = (e) => {
        e.preventDefault()

        const arr = date.split('-').reverse()
        const drr = arr.join('-')
        // console.log(typeof drr)
        const time = startTime + '-' + endTime
        const data = {
            date: drr,
            time,
            groundId: ground._id
        }
        axios.post(`http://localhost:3088/scout/ground/availability`, data, {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log('data msg received', res.data)
                alert(`the slot is ${res.data.msg}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='container' style={{ paddingTop: '10px' }}>
            <div className='row'>
                <div className='col-sm-6'>
                    <h1>{ground.name}</h1>
                </div>
                <div className='col-sm-6'>
                    <div style={{ border: '2px solid #6F6F6F' }}>
                        <h3>Timings<br />{ground.timings}</h3>
                    </div>
                    <div style={{ border: '2px solid #6F6F6F', marginTop: '10px' }}>
                        <h3>location -: {ground.location}</h3>
                    </div>

                    <h3>price -: {ground.price}</h3>
                </div>
            </div>
            <div className='container form-box'>
                <form onSubmit={handleSubmit}>
                    <label className='form-label'>select your date</label>
                    <input className='form-control' type='date' name='date' value={date} onChange={hanldeChange} /><br />
                    <label className='form-label'>select your time</label><br />
                    <label className='form-label'>start time</label>
                    <input className='form-control' type='time' name='startTime' value={startTime} onChange={hanldeChange} />
                    <label className='form-label'>end time</label>
                    <input className='form-control' type='time' name='endTime' value={endTime} onChange={hanldeChange} /><br />
                    <div style={{ alignItems: 'centre', paddingLeft: '50px' }}>
                        <button className='btn btn-secondary' onClick={handleClick}> check availablity </button>
                    </div>
                    <br/>
                    <input className='form-control btn btn-success btn-lg' type='submit' value='Book' />
                </form>
            </div>
        </div>
    )
}

export default BookingPage