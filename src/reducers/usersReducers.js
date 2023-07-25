const initialState = {
    loggedInUser:{},
    allUsers: []
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

        default : {
            return {...state}
        } 
    }
}


export default usersReducer