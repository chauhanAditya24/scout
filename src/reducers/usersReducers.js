const initialState = {
    usersAll: [],
    currentUser: {},
    loggedIn: false,
    allUsers: [],
    usersListCondition: [],
    selectedPlayer: {},
    role: '',
    userid: '',
    viewDetials: {},
    usersFollowers: [],
    usersFollowing: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGGED_IN_USER': {
            return { ...state }
        }

        case 'VIEW_DETAILS': {
            return { ...state, viewDetials: action.payload }
        }

        case 'USERS_ALL': {
            return { ...state, usersAll: action.payload }
        }

        case 'SET_ID': {
            return { ...state, userid: action.payload }
        }

        case 'SET_ROLE': {
            return { ...state, role: action.payload }
        }

        case 'ADD_USER': {
            return { ...state, allUsers: [...state.data, action.payload] }
        }

        case 'ALL_USERS': {
            return { ...state, allUsers: action.payload }
        }

        //updating the value to true when user loggin in
        case 'LOGGED_IN': {
            return { ...state, loggedIn: action.payload }
        }

        case 'CURRENT_USER': {
            return { ...state, currentUser: action.payload }
        }

        case 'DEFAULT_FOLLOWERS': {
            return { ...state, usersFollowers: action.payload }
        }

        case 'REMOVE_FOLLOWER': {
            return { ...state, usersFollowers: action.payload }
        }

        case 'FOLLOWERS': {
            // const currUser = state.currentUser
            // currUser.followers = action.payload
            // return { ...state, currentUser: currUser }
            return { ...state, usersFollowers: action.payload }
        }

        case 'SET_SPECIFIC_USER': {
            return { ...state, usersListCondition: action.payload }
        }

        case 'ADD_PLAYER': {
            return { ...state, selectedPlayer: action.payload }
        }
        
        case 'ADD_FOLLOWING': {
            return { ...state, usersFollowing: action.payload }
        }

        default: {
            return { ...state }
        }
    }
}


export default usersReducer