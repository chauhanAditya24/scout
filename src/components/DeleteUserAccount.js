import axios from "axios"
import React, { useEffect, useState } from "react"
import { updateLoggedIn } from "../actions/usersAction"
import { useDispatch, useSelector } from "react-redux"
import '../css/overlap.css'

const DeleteUserAccount = (props) => {

    const dispatch = useDispatch()
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        if (update) {
            const timeout = setTimeout(() => {
                setUpdate(false)
            }, 2000)

              
            setTimeout(() => {
                dispatch(updateLoggedIn(false))
                props.history.push('/login')
            },2000)

            return () => clearTimeout(timeout)
        }
    }, [dispatch,props.history, update])

    const user = useSelector((state) => {
        return state.users.currentUser
    })

    console.log(user)

    const handleCancel = () => {
        props.history.push('/account')
    }

    const handleDeleteManager = () => {
        axios.delete(`http://localhost:3088/scout/acount/remove`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log('data from manager', res.data)
                // alert('successfully deleted all')
                setUpdate(true)
                localStorage.removeItem('token')
                // props.history.push('/login')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDeletePlayer = () => {
        axios.delete(`http://localhost:3088/scout/acount/remove`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log('data from player', res.data)
                // alert('successfully deleted user')
                localStorage.removeItem('token')
                setUpdate(true)
                // dispatch(updateLoggedIn(false))
                // props.history.push('/login')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSubmitClick = () => {
        setUpdate(false)
    }

    return (
        <div className="container">
            {
                user && (
                    <>
                        {update && (
                            <div className="toast show position-fixed bottom-0 end-0 p-2 m-4 toast-available" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="toast-header">
                                    <strong className="me-auto">Successfully deleted your account</strong>
                                    <button type="button" className="btn-close" onClick={handleSubmitClick}></button>
                                </div>
                            </div>
                        )}
                        {
                            user.role === 'manager' ? (
                                <div>
                                    <h2>Are you sure you want to permanently delete your account?</h2>
                                    <button onClick={handleDeleteManager}> Yes </button>
                                    <button onClick={handleCancel}> Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <h2>Are you sure you want to permanently delete your account?</h2>
                                    <button onClick={handleDeletePlayer}> Yes </button>
                                    <button onClick={handleCancel}> Cancel</button>
                                </div>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default DeleteUserAccount