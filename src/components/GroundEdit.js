import axios from "axios"
import React from "react"
import { useState } from "react"
import { useSelector } from "react-redux"

const GroundEdit = (props) => {
    const {ground,id} = useSelector((state) => {
        return {
            ground: state.grounds.groundToEdit,
            id: state.users.userid
        } 
    })

    const [ name, setName ] = useState(ground.name)
    const [ location , setLocation ] = useState(ground.location)
    const [ city, setCity ] = useState(ground.city)
    const [ price, setPrice ] = useState(ground.price)
    const [ timings, setTimings ] = useState(ground.timings)
    const [ slot , setSlot] = useState(ground.slotType)
    const [ sport , setSport ] = useState(ground.sport)
    const [capacity, setCapacity] = useState(ground.capacity)
    const uid = id
    const [ formErrors, setFormErrors] = useState({})
    const errors = {}
    
    const validation = () => {
        if(name.trim().length === 0){
            errors.name = 'name cannot be blank'
        }
        
        if(location.trim().length === 0){
            errors.location = 'loaction cannot be blank'
        }
        
        if(price.trim().length === 0){
            errors.price = 'price cannot be blank'
        }
        
        if(timings.trim().length === 0){
            errors.timings = 'timings cannot be blank'
        }

        if(slot === ''){
            errors.slot = 'slot must be provided so that you can see the nearest players'
        }

        if(capacity === '' ){
            errors.capacity = 'capacity cannot be blank'
        }else if(Number(capacity)  < 2){
            errors.capacity = 'capacity cannot be less than 2'
        }else if(Number(capacity) > 30){
            errors.capacity = 'max persons in the filed in 30'
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
                timings,
                sport,
                slotType:slot,
                userId:uid,
                capacity
            }
            console.log(formData)

            axios.put(`http://localhost:3088/scout/grounds/update/${ground._id}`,formData)
                .then((result) => {
                    if(result.data){
                        alert('data changed successfully')
                        props.history.push('/')
                    }else{
                        alert('some internal error please try again later')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
                

        }else{
            setFormErrors(errors)
        }
    }

    const handleChange = (e) => {
        if(e.target.name === 'name'){
            setName(e.target.value)
        }else if(e.target.name === 'location'){
            setLocation(e.target.value)
        }else if(e.target.name === 'price'){
            setPrice(e.target.value)
        }else if(e.target.name === 'time'){
            setTimings(e.target.value)
        }else if(e.target.name === 'slot'){
            setSlot(e.target.value)
        }else if(e.target.name === 'capacity'){
            setCapacity(e.target.value)
        }
    }

    return (
        <div>
            <h2>edit ground details</h2>
            
            <form onSubmit={handleSubmit}>
                <label>Ground name : </label>
                <input type='text' 
                    name='name'
                    value={name}
                    onChange={handleChange}
                    placeholder='enter the gound name'
                />
                {formErrors.name && <span style={{color: 'red'}}> {formErrors.name} </span>}
                <br/>
                <label>ground's location</label>
                <input type='text'
                    name='location'
                    value={location}
                    onChange={handleChange}
                    placeholder='enter the address'
                />
                {formErrors.location && <span style={{color: 'red'}}> {formErrors.location}</span>}
                <br/>
                <label>price</label>
                <input type='text'
                    name='price'
                    value={price}
                    onChange={handleChange}
                    placeholder='enter the price per person'
                />
                {formErrors.price && <span style={{color: 'red'}}> {formErrors.price}</span>}
                <br/>
                
                <label>timings</label>
                <input type='text'
                    name='time'
                    value={timings}
                    onChange={handleChange}
                    placeholder='enter the timings'
                />
                {formErrors.timings && <span style={{color: 'red'}}> {formErrors.timings}</span>}
                <br/>
                
                <label> enter your timeframe</label>
                <input type='text' 
                    name='slot'
                    value={slot}
                    onChange={handleChange}
                    placeholder='enter the timeframe a single user can play min is 1 hour - max is 3 hours'
                />{formErrors.slot && <span style={{color: 'red'}}> {formErrors.slot}</span>}<br/>
                <label>max capacity</label>
                <input type='text'
                    name='capacity'
                    onChange={handleChange}
                    placeholder='both team combined max players'
                    value={capacity}
                />{formErrors.capacity && <span style={{color: 'red'}}>  {formErrors.capacity}</span>}<br/>


                <input type='submit' value='edit details'/>
            </form>

        </div>
    )
}

export default GroundEdit