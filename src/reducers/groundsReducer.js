const initialState = {
    groundsList: [],
    groundsListCondition: [],
    selectedGround: {}
}

const groundsReducer = ( state = initialState , action) => {
    switch( action.type ) {
        case 'SET_GROUNDS': {
            return { ...state , groundsList: [...action.payload] }
        }

        case 'SELECTED_GROUND': {
            return { ...state , selectedGround: action.payload}
        }

        case 'SET_SPECIFIC_GROUND': {
            return { ...state , groundsListCondition: action.payload}
        }

        default: {
            return { ...state }
        }
    }
}

export default groundsReducer