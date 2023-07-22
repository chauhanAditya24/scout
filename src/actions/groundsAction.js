import axios from 'axios'

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
