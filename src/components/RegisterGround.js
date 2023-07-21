import React from 'react'
import {useState} from 'react'

const RegisterGround = (props) => {
    const [ name, setName ] = useState('')
    const [ location , setLocation ] = useState('')
    const [ city, setCity ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ timings, setTimings ] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name,
            location,
            city,
            price,
            timings
        }
        console.log(formData)

    }

    const handleChange = (e) => {
        if(e.target.name === 'name'){
            setName(e.target.value)
        }else if(e.target.name === 'location'){
            setLocation(e.target.value)
        }else if(e.target.name === 'city'){
            setCity(e.target.value)
        }else if(e.target.name === 'price'){
            setPrice(e.target.value)
        }else if(e.target.name === 'time'){
            setTimings(e.target.value)
        }
    }

    return (
        <div>
            <h1>register ground</h1>
            <from onSubmit={handleSubmit}>
                <label>Ground name : </label>
                <input type='text' 
                    name='name'
                    value={name}
                    onChange={handleChange}
                    placeholder='enter the gound name'
                /><br/>
                <label>ground's location</label>
                <input type='text'
                    name='location'
                    value={location}
                    onChange={handleChange}
                    placeholder='enter the address'
                /><br/>
                <label>enter the city</label>
                <input type='text'
                    name='city'
                    value={city}
                    onChange={handleChange}
                    placeholder='enter city'
                /><br/>
                <label>price</label>
                <input type='text'
                    name='price'
                    value={price}
                    onChange={handleChange}
                    placeholder='enter the price per person'
                /><br/>
                <label>timings</label>
                <input type='text'
                    name='time'
                    value={timings}
                    onChange={handleChange}
                    placeholder='enter the timings'
                /><br/>
                <input type='submit' value='register ground'/>
            </from>
        </div>

    )
}


export default RegisterGround