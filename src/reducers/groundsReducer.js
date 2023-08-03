const initialState = {
    groundsList: [],
    groundsListCondition: [],
    selectedGround: {},
    specificGround: {},
    ownersGround:[],
    groundToEdit: {},
    groundToEditId:''
}

const groundsReducer = ( state = initialState , action) => {
    switch( action.type ) {
        case 'SET_GROUNDS': {
            return { ...state , groundsList: [...action.payload] }
        }

        case 'EDIT_GROUND': {
            return { ...state,groundToEdit: action.payload}
        }

        case 'ADD_USERS_GROUND': {
            return { ...state , ownersGround:action.payload}
        }

        case 'SELECTED_GROUND': {
            return { ...state , selectedGround: action.payload}
        }

        case 'SET_SPECIFIC_GROUND': {
            return { ...state , groundsListCondition: action.payload}
        }

        case 'ADD_DETAILS': {
            return { ...state , specificGround: action.payload}
        }

        default: {
            return { ...state }
        }
    }
}

export default groundsReducer