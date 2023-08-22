import axios from "axios"
import React, { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import '../css/overlap.css'

const UpdateGroundPicture = (props) => {

    const [update, setUpdate] = useState(false)

    const ground = useSelector((state) => {
        return state.grounds.groundPictureUpdate
    })

    useEffect(() => {
        if (update) {
            const timeout = setTimeout(() => {
                setUpdate(false);
            }, 2000); // 3000 milliseconds = 3 seconds

            setTimeout(() => {
                props.history.push('/')
            }, 2000)

            return () => clearTimeout(timeout);
        }

    }, [ props.history, update])

    const [image, setImage] = useState('')
    console.log(ground)

    const handleChange = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmitClick = () => {
        setUpdate(false)
    }  

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('groundPicture',image)

        axios.put(`http://localhost:3088/scout/groundPicture/update/${ground._id}`,formData,{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log('updated the profile picture for ', res.data)
                setUpdate(true)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const handleClick = () => {
        props.history.push('/')
    }

    return (
        <div className="container">
            <h2 style={{ marginLeft: '430px', marginTop: '100px' }}> Please select the picture...</h2>
            {update && (
                <div className="toast show position-fixed bottom-0 end-0 p-2 m-4 toast-available" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">Successfully updated ground picture</strong>
                        <button type="button" className="btn-close" onClick={handleSubmitClick}></button>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit} className="home-box-pic" encType="multipart/form-data">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <input type='file' name="image" onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <input type="submit" style={{ marginRight: '10px' }} value='update picture' className="btn btn-success" />
                <button onClick={handleClick} className='btn btn-danger'> Cancel </button>
            </form>
        </div>
    )
}

export default UpdateGroundPicture