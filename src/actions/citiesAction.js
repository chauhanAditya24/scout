import axios from 'axios'
import { BASE_URL } from '../services/helper'

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
        axios.get(`${BASE_URL}/scout/cities/list`)
            .then((res) => {
                dispatch(addCities(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}