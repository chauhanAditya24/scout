import { createStore , combineReducers , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import usersReducers from '../reducers/usersReducers'
import groundsReducer from '../reducers/groundsReducer'
import citiesReducer from '../reducers/citiesReducer'
import sportsReducer from '../reducers/sportsReducer'
import bookingsReducer from '../reducers/bookingsReducer'
import chatReducer from '../reducers/chatReducer'
import notificationReducer from '../reducers/notificationReducer'

const configureStore = () => {
    const store = createStore( combineReducers({
        users: usersReducers,
        grounds: groundsReducer,
        cities:  citiesReducer,
        sports: sportsReducer,
        bookings: bookingsReducer,
        chats: chatReducer,
        notification: notificationReducer
    }) , applyMiddleware(thunk))

    return store
}
 
export default configureStore