const initialState = {
    cities: [],
    city: ''
}

const citiesReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_CITIES': {
            return {...state, cities: action.payload}
        }

        case 'SELECTED_CITY': {
            return { ...state , city: action.payload}
        }

        default:{
            return { ...state }
        }
    }
}

export default citiesReducer