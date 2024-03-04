const initialState = {
    booking: [],
    tempData: {}
}

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_BOOKINGS': {
            return { ...state, booking: action.payload }
        }
        
        case 'BOOKING_DATA' : {
            console.log('bookings Action data check ', action.payload)

            return {...state,tempData:action.payload}
        }

        default: {
            return { ...state }
        }
    }
}

export default bookingsReducer