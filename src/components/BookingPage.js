import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const BookingPage = (props) => {

    const [ date , setDate] = useState('')
    const [ startTime , setStartTime ] = useState('')
    const [ endTime , setEndTime ] = useState('')

    const ground = useSelector((state) => {
        return state.grounds.specificGround
    })

    // console.log('gound inside booking page',ground)

    const hanldeChange = (e) => {
        if(e.target.name === 'date'){
            setDate(e.target.value)
        }else if(e.target.name === 'startTime'){
            setStartTime(e.target.value)
        }else if(e.target.name === 'endTime'){
            setEndTime(e.target.value)
        }
    }

    // console.log('date' , date)
    // console.log('timings ' ,startTime,endTime)

    const handleSubmit = (e) => {
        e.preventDefault()

        const arr= date.split('-').reverse()
        const drr = arr.join('-')
        // console.log(typeof drr)
        const time = startTime+'-'+endTime
        const data = {
            date:drr,
            time,
            groundId:ground._id 
        }

        axios.post(`http://localhost:3088/scout/ground/book` , data , {
            headers:{
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

        const arr= date.split('-').reverse()
        const drr = arr.join('-')
        // console.log(typeof drr)
        const time = startTime+'-'+endTime
        const data = {
            date:drr,
            time,
            groundId:ground._id 
        }
        axios.post(`http://localhost:3088/scout/ground/availability`,data,{
            headers:{
                'authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log('data msg received',res.data)
                alert(`the slot is ${res.data.msg}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <h1>booking page</h1>
            <h3>{ground.name}</h3>
            <h3>location -: {ground.location}</h3>
            <h3>timings -: {ground.timings}</h3>
            <h3>price -: {ground.price}</h3>

            <div>
                <form onSubmit={handleSubmit}>
                    <label>select your date</label>
                    <input type='date' name='date' value={date} onChange={hanldeChange}/><br/>
                    <label>select your time</label><br/>
                    <label>start time</label>
                    <input type='time' name='startTime' value={startTime} onChange={hanldeChange}/>
                    <label>end time</label>
                    <input type='time' name='endTime' value={endTime} onChange={hanldeChange}/><br/>

                    <button onClick={handleClick}> check availablity </button>

                    <input type='submit' value='Book'/>
                </form>
            </div>
        </div>
    )
}

export default BookingPage