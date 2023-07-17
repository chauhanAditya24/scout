import React, { useState } from 'react'

const Register = (props) => {
    const [ name, setName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ mobile, setMobile ] = useState('')

    const resetAll = () => {
        setName('')
        setPassword('')
        setMobile('')
        setEmail('')
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name,
            email,
            password,
            mobile
        }
        resetAll()
        console.log(formData)
    }

    const handleMobileChange = (e) => {
        const ans = e.target.value
        console.log(ans)
        setMobile(ans)
    }

    const handlePasswordChange = (e) => {
        const ans = e.target.value
        console.log(ans)
        setPassword(ans)
    }

    const handleEmailChange = (e) => {
        const ans = e.target.value
        console.log(ans)
        setEmail(ans)
    }

    const handleNameChange = (e) => {
        console.log(e.target.value)
        const ans = e.target.value
        setName(ans)
    }

    return (
        <div>
            <h3> Register on scout</h3>
            <form onSubmit={handleFormSubmit}>
                <label>Name : </label>
                <input type='text'
                    value={name} 
                    onChange={handleNameChange} 
                    placeholder='enter username'/><br/>
                <label>Email : </label>
                <input type='text'
                    value={email}
                    onChange={handleEmailChange}
                    placeholder='enter email'/><br/>
                <label>Password : </label>
                <input type='password'
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder='enter your password'/><br/>
                <label>Mobile : </label>
                <input type='number'
                    value={mobile}
                    onChange={handleMobileChange}
                    placeholder='enter mobile number'/><br/>
                <input type='submit' value='game on!!'/>
            </form>
        </div>
    )
}

export default Register