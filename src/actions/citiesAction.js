import axios from 'axios'

export const selectedCity = (city) => {
    return {
        type: 'SELECTED_CITY',
        payload: city
    }
}

export const addCities = (cities) => {
    return {
        type: 'ADD_CITIES',
        payload: cities
    }
}

export const getCities = () => {
    return (dispatch) => {
        axios.get('http://localhost:3088/scout/cities/list')
            .then((res) => {
                dispatch(addCities(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}