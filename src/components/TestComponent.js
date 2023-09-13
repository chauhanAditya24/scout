import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/helper'

const TestComponent = (props) => {
    const [ image , setImage] = useState('') 

    useEffect(() => {
        axios.get(`${BASE_URL}/scout/image/64c7e757ac39be94259f562d`)
            .then((res) => {
                console.log(res.data)
                setImage(res.data.profilePicture)
            })
            .catch((err) => {
                console.log(err)
            })
    },[])

    console.log('iamge path ', image)

    return(
        <div>
            <h1> image : </h1>
            { image && <img src={image} alt='uploaded'/> }
        </div>
    )
}

export default TestComponent