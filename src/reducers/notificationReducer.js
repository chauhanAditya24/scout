const initialState = []

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NOTIFICATIONS': {
            return { ...state, booking: action.payload }
        }

        default: {
            return {...state}
        }
    }
}

export default notificationReducer