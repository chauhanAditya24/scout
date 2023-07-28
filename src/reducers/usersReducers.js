const initialState = {
    currentUser: {},
    loggedIn: false,
    allUsers: [],
    usersListCondition: [],
    selectedPlayer: {}
}

const usersReducer = ( state = initialState , action) => {
    switch(action.type) {
        case 'LOGGED_IN_USER': {
            return {...state}
        }
        
        case 'ADD_USER': {
            return {...state,allUsers:[...state.data,action.payload]}
        }

        case 'ALL_USERS': {
            return { ...state, allUsers:action.payload}
        }

        //updating the value to true when user loggin in
        case 'LOGGED_IN': {
            return { ...state , loggedIn: action.payload }
        }

        case 'CURRENT_USER': {
            return {...state , currentUser: action.payload}
        }

        case 'SET_SPECIFIC_USER': {
            return { ...state , usersListCondition: action.payload}
        }

        case 'ADD_PLAYER': {
            return { ...state , selectedPlayer: action.payload }
        }
    
        default : {
            return {...state }
        } 
    }
}


export default usersReducer