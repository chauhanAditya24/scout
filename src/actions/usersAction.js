import axios from 'axios'


export const startUserLogin = (formData) => {
    return (dispatch) => {
        axios.post('http://localhost:3088/scout/login', formData)
            .then((res) => {
                const result = res.data
                if(result.hasOwnProperty('error')){
                    alert(result.error)
                }else{
                    alert('logged in successfully')
                    localStorage.setItem('token' , result.token.split(' ')[1])
                    dispatch(startGetUsers())
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