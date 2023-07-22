export const loggedInUser = ( obj ) => {
    return {
        type: 'LOGGED_IN_USER',
        payload: obj
    }
}