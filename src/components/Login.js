import React from 'react'
import {useState} from 'react'

const Login = (props) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ radio , setRadio ] = useState('')

    const handleSubmit = (e) => {
        // e.preventDefault()
        const formData = {
            email,
            password,
            radio
        }
        console.log(formData)
        // console.log(props)
        setEmail('')
        setRadio('')
        setPassword('')
        // props.history.push('/home')
    }

    const handleChange = (e) => {
        if(e.target.name === 'email') {
            setEmail(e.target.value)
        }else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }else if(e.target.name === 'userType'){
            setRadio(e.target.value)
        }
    }

    return (
        <div>
            <h1> Login </h1>
            <form onSubmit={handleSubmit}>
                <label> Email : </label>
                <input type="text" 
                    value={email} 
                    placeholder='enter your email' 
                    onChange={handleChange}
                    name='email'
                /><br/>
                <label> Password : </label>
                <input type='password' 
                    value={password} 
                    placeholder='enter password' 
                    onChange={handleChange}
                    name='password'
                /><br/>
                <input type='radio' 
                    name='userType' 
                    value='player' 
                    checked={radio === 'player'} 
                    onChange={handleChange}
                /> player 
                <input type='radio'
                    name='userType'
                    value='manager'
                    checked={radio === 'manager'}
                    onChange={handleChange}    
                /> manager
                <input type='submit' value=' Login in'/>
            </form>

        </div>
    )
}

export default Login