import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TestComponent = (props) => {
    const [ image , setImage] = useState('') 

    useEffect(() => {
        axios.get(`http://localhost:3088/image/get/64c77770911a85481d832a61`)
            .then((res) => {
                const blob = new Blob([res.data.profilePicture],{type: 'image/jpeg'})
                setImage(URL.createObjectURL(blob))
            })
            .catch((err) => {
                console.log(err)
            })
    },[])

    return(
        <div>
            <h1> image : </h1>
            { image && <img src={image} alt='uploaded'/> }
        </div>
    )
}

export default TestComponent