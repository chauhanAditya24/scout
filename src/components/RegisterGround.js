import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const RegisterGround = (props) => {
    const [ name, setName ] = useState('')
    const [ location , setLocation ] = useState('')
    const [ city, setCity ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ timings, setTimings ] = useState('')
    // client side validations
    const [ formErrors, setFormErrors] = useState({})
    const errors = {}

    const validation = () => {
        if(name.trim().length === 0){
            errors.name = 'name cannot be blank'
        }
        
        if(location.trim().length === 0){
            errors.location = 'loaction cannot be blank'
        }
        
        if(city.trim().length === 0){
            errors.city = 'city cannot be blank'
        }
        
        if(price.trim().length === 0){
            errors.price = 'price cannot be blank'
        }
        
        if(timings.trim().length === 0){
            errors.timings = 'timings cannot be blank'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        validation()

        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const formData = {
                name,
                location,
                city,
                price,
                timings
            }
            console.log(formData)
        }else{
            setFormErrors(errors)
        }

        // console.log(formData)

        // axios.post('http://localhost:3088/scout/grounds/register',formData)
        //     .then((res) => {
        //         console.log(res.data)
        //     })
        //     .catch((err) => {
        //         console.log(err.message)
        //     })
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
            <form onSubmit={handleSubmit}>
                <label>Ground name : </label>
                <input type='text' 
                    name='name'
                    value={name}
                    onChange={handleChange}
                    placeholder='enter the gound name'
                />
                {formErrors.name && <span style={{color: 'red'}}> name cannot be blank </span>}
                <br/>
                <label>ground's location</label>
                <input type='text'
                    name='location'
                    value={location}
                    onChange={handleChange}
                    placeholder='enter the address'
                />
                {formErrors.location && <span style={{color: 'red'}}> location cannot be blank</span>}
                <br/>
                <label>enter the city</label>
                <input type='text'
                    name='city'
                    value={city}
                    onChange={handleChange}
                    placeholder='enter city'
                />
                {formErrors.city && <span style={{color: 'red'}}> city cannot be blank</span>}
                <br/>
                <label>price</label>
                <input type='text'
                    name='price'
                    value={price}
                    onChange={handleChange}
                    placeholder='enter the price per person'
                />
                {formErrors.price && <span style={{color: 'red'}}> price cannot be blank</span>}
                <br/>
                <label>timings</label>
                <input type='text'
                    name='time'
                    value={timings}
                    onChange={handleChange}
                    placeholder='enter the timings'
                />
                {formErrors.timings && <span style={{color: 'red'}}> timings cannot be blank</span>}
                <br/>
                <input type='submit' value='register ground'/>
            </form>
        </div>

    )
}


export default RegisterGround