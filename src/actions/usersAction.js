import axios from 'axios'
import { BASE_URL } from '../services/helper'

export const addPlayer = (data) => {
    return {
        type: 'ADD_PLAYER',
        payload: data
    }
}

export const viewDetials = (data) => {
    return {
        type:'VIEW_DETAILS',
        payload:data
    }
}

export const startGetUsersAdmin = (id) => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/admin/view/details/${id}`,{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
            .then((res) => {
                dispatch(viewDetials(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const usersAllList = (data) => {
    return {
        type: 'USERS_ALL',
        payload:data
    }
}

export const startGetUsersAll = () => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/scout/list`,{
            headers:{
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                dispatch(usersAllList(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const startGetSelectedPlayer = (id) => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/scout/player/${id}`,{
            headers:{
                'authorization': localStorage.getItem('token')
            }
        })
        .then((res) => {
            dispatch(addPlayer(res.data))
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const setSpecificUser = (data) => {
    return {
        type: 'SET_SPECIFIC_USER',
        payload: data
    }
}

export const startGetSpecificUsers = (obj) => {
    return (dispatch) => {
        axios.post(`${BASE_URL}/scout/users/specific`, obj , {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
        .then((res) => {
            console.log(res.data)
            dispatch(setSpecificUser(res.data))
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const currentUser = (user) => {
    return {
        type: 'CURRENT_USER',
        payload: user
    }
}

export const updateDetails = (formData) => {
    return (dispatch) => {
        axios.put(`${BASE_URL}/scout/user/update`, formData, {
            headers:{
                'authorization': localStorage.getItem('token')
            }
        })
        .then((res) => {
            const result = res.data
            console.log('result from the put request',result)
            dispatch(currentUser(result))
        })
        .catch((err) => {
            console.log(err)
        })
    }
}


export const getCurrentUser = () => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/scout/user/account`,{
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
        .then((res) => {            
            const result = res.data
            // console.log(result)
            dispatch(currentUser(result))
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const updateLoggedIn = (value) => {
    return {
        type: 'LOGGED_IN',
        payload: value
    }
}

export const setRole = (data) => {
    return {
        type: 'SET_ROLE',
        payload: data
    }

}

export const setUserId = (id) => {
    return {
        type: 'SET_ID',
        payload: id
    }
}

export const startGetRole = () => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/scout/user/login`,{
            headers:{
                'authorization':localStorage.getItem('token')
            }
        })
        .then((res) => {
            // console.log('current user',res.data)
            dispatch(setRole(res.data.role))
            dispatch(setUserId(res.data._id))
        })
        .catch((err) => {
            console.log(err)
        })
}
}

export const startUserLogin = (formData) => {
    return (dispatch) => {
        axios.post(`${BASE_URL}/scout/login`, formData)
            .then((res) => {
                const result = res.data
                if(result.hasOwnProperty('error')){
                    alert(result.error)
                }else{
                    // alert('logged in successfully')
                    localStorage.setItem('token' , result.token)
                    dispatch(updateLoggedIn(true))
                    dispatch(startGetUsers())
                    dispatch(startGetRole())
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const startPostUsers = (formData) => {
    return (dispatch) => {
        axios.post(`${BASE_URL}/scout/register`,formData)
            .then((res) => {
                const user = res.data
                console.log('api call to post the data:',user)
                if(user.hasOwnProperty('error')){
                    alert(user.error)
                }else{
                    // alert('thanks for registering with us please login.')
                    console.log('thanks for registering with us please login.')
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}


export const allUsers = (users) => {
    return {
        type: 'ALL_USERS',
        payload: users
    }
}

export const startGetUsers = () => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/scout/list`,{
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                const users = res.data
                // console.log('users data after login:',users)
                dispatch(allUsers(users))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}