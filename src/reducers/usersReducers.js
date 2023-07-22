const initialState = {
    loggedInUser:{}
}

const usersReducer = ( state = initialState , action) => {
    switch(action.type) {
        case 'LOGGED_IN_USER': {
            return {...state}
        }

        default : {
            return {...state}
        } 
    }
}


export default usersReducer