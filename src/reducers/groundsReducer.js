const initialState = {
    groundsList: [],
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

        default: {
            return { ...state }
        }
    }
}

export default groundsReducer