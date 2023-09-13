import axios from 'axios'
import { BASE_URL } from '../services/helper'

export const addGroundPicture = (data) => {
    return {
        type: 'EDIT_GROUND_PICTURE',
        payload: data
    }
}

export const startGetGroundPicture = (id) => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/scout/grounds/${id}`, {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                dispatch(addGroundPicture(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const addEditGround = (data) => {
    return {
        type: 'EDIT_GROUND',
        payload: data
    }
}

export const startGetEditGroundDetials = (id) => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/scout/grounds/${id}`, {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                dispatch(addEditGround(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const addUsersGround = (data) => {
    return {
        type: 'ADD_USERS_GROUND',
        payload: data
    }
}

export const startGetUsersGround = () => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/scout/ground/user`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(' inside startgetusersground', res.data)
                dispatch(addUsersGround(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const addSelectedGround = (obj) => {
    return {
        type: 'ADD_DETAILS',
        payload: obj
    }
}

export const selectedGround = (ground) => {
    // console.log('inside the groundAction', ground)
    return {
        type: 'SELECTED_GROUND',
        payload: ground
    }
}

const setGrounds = (grounds) => {
    return {
        type: 'SET_GROUNDS',
        payload: grounds
    }
}

export const startGetGrounds = () => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/scout/grounds/all`)
            .then((res) => {
                const grounds = res.data
                console.log(grounds)
                dispatch(setGrounds(grounds))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const setSpecificGround = (grounds) => {
    return {
        type: 'SET_SPECIFIC_GROUND',
        payload: grounds
    }
}

export const startGetSpecificGrounds = (obj) => {
    return (dispatch) => {
        axios.post(`${BASE_URL}/scout/grounds/specific`, obj, {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                const grounds = res.data
                console.log('after making api request from  specifi', res)
                dispatch(setSpecificGround(grounds))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}