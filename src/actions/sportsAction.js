import axios from 'axios'

export const selectedSport = (sport) => {
    return {
        type: 'SELECTED_SPORT',
        payload: sport
    }
}

export const getSports = (data) => {
    return {
        type: 'ADD_SPORTS',
        payload: data
    }
}

export const startGetSports = () => {
    return (dispatch) => {
        axios.get('http://localhost:3088/scout/sports/list')
            .then((res) => {
                const result= res.data
                dispatch(getSports(result))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}