import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../actions/usersAction"
import axios from "axios"
import '../css/profilePic.css'
import '../css/overlap.css'
import { BASE_URL } from "../services/helper"

const UpdateProfilePicture = (props) => {

    const [update, setUpdate] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentUser())

        if (update) {
            const timeout = setTimeout(() => {
                setUpdate(false);
            }, 2000); // 3000 milliseconds = 3 seconds

            setTimeout(() => {
                props.history.push('/account')
            }, 2000)

            return () => clearTimeout(timeout);
        }

    }, [dispatch, props.history, update])

    const user = useSelector((state) => {
        return state.users.currentUser
    })

    console.log('user', user)

    const [image, setImage] = useState('')
    console.log('iamge ', image)

    const handleChange = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('profilePicture', image)
        // console.log('formData', formData)

        axios.put(`${BASE_URL}/scout/picture/update`, formData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log('updated profile picutre', res.data)
                setUpdate(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleClick = () => {
        props.history.push('/account')
    }

    const handleSubmitClick = () => {
        setUpdate(false)
    }

    return (
        <div className="container">
            <h2 style={{ marginLeft: '430px', marginTop: '100px' }}> Please Select the picture ...</h2>
            {update && (
                <div className="toast show position-fixed bottom-0 end-0 p-2 m-4 toast-available" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">Successfully updated profile picture</strong>
                        <button type="button" className="btn-close" onClick={handleSubmitClick}></button>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit} className="home-box-pic" encType="multipart/form-data" >
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className='mb-3'>
                            <input type='file' name='image' onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <input type="submit" style={{ marginRight: '10px' }} value={'update picutre'} className="btn btn-success" />
                <button className="btn btn-danger" onClick={handleClick}> Cancel </button>
            </form>
        </div>
    )
}

export default UpdateProfilePicture