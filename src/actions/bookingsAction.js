import axios from "axios"
import { BASE_URL } from "../services/helper"

export const addBookings = (data) => {
    return {
        type: 'ADD_BOOKINGS',
        payload: data
    }
}

export const startGetManagerBookings = () => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/scout/bookings/manager`, {
            headers:{
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data)
                dispatch(addBookings(res.data))
            })
            .catch((err) =>{
                console.log(err)
            })
    }
}

export const startGetBookings = () => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/scout/bookings`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                // console.log('data from start get bookings', res.data)
                dispatch(addBookings(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}