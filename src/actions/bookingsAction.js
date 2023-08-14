import axios from "axios"

export const addBookings = (data) => {
    return {
        type: 'ADD_BOOKINGS',
        payload: data
    }
}

export const startGetBookings = () => {
    return (dispatch) => {
        axios.get('http://localhost:3088/scout/bookings', {
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