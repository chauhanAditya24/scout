import axios from 'axios'

export const addPlayer = (data) => {
    return {
        type: 'ADD_PLAYER',
        payload: data
    }
}

export const startGetSelectedPlayer = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3088/scout/player/${id}`,{
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
        axios.post('http://localhost:3088/scout/users/specific', obj , {
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
        axios.put('http://localhost:3088/scout/user/update', formData, {
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
        axios.get('http://localhost:3088/scout/user/account',{
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
        axios.get('http://localhost:3088/scout/user/login',{
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
        axios.post('http://localhost:3088/scout/login', formData)
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
        axios.post('http://localhost:3088/scout/register',formData)
            .then((res) => {
                const user = res.data
                console.log('api call to post the data:',user)
                if(user.hasOwnProperty('error')){
                    alert(user.error)
                }else{
                    alert('thanks for registering with us please login.')
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
        axios.get('http://localhost:3088/scout/list')
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