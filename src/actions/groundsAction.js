import axios from 'axios'

export const addSelectedGround = (obj) => {
    return {
        type:'ADD_DETAILS',
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
        axios.get('http://localhost:3088/scout/grounds/all')
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
        type:'SET_SPECIFIC_GROUND',
        payload: grounds
    }
}

export const startGetSpecificGrounds = (obj) => {
    return (dispatch) => {
        axios.post('http://localhost:3088/scout/grounds/specific',obj,{
            headers: {
                'authorization': localStorage.getItem('token')
                }
            })
            .then((res) => {
                const grounds = res.data
                console.log('after making api request from  specifi',res)
                dispatch(setSpecificGround(grounds))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}