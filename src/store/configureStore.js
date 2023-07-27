import { createStore , combineReducers , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import usersReducers from '../reducers/usersReducers'
import groundsReducer from '../reducers/groundsReducer'
import citiesReducer from '../reducers/citiesReducer'
import sportsReducer from '../reducers/sportsReducer'

const configureStore = () => {
    const store = createStore( combineReducers({
        users: usersReducers,
        grounds: groundsReducer,
        cities:  citiesReducer,
        sports: sportsReducer
    }) , applyMiddleware(thunk))

    return store
}
 
export default configureStore