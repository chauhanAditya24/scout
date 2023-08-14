const initialState = {
    booking: []
}

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_BOOKINGS': {
            return { ...state, booking: action.payload }
        }

        default: {
            return { ...state }
        }
    }
}

export default bookingsReducer