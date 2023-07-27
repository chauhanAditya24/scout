const initialState = {
    sports: [],
    sport: ''
}

const sportsReducer = ( state = initialState , action) => {
    switch(action.type) {
        
        case 'ADD_SPORTS': {
            return { ...state , sports: action.payload}
        }

        case 'SELECTED_SPORT': {
            return { ...state , sport: action.payload}
        }

        default: {
            return {...state}
        }
    }
}

export default sportsReducer