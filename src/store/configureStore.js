import { createStore , combineReducers , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import usersReducers from '../reducers/usersReducers'
import groundsReducer from '../reducers/groundsReducer'

const configureStore = () => {
    const store = createStore( combineReducers({
        users: usersReducers,
        grounds: groundsReducer
    }) , applyMiddleware(thunk))

    return store
}
 
export default configureStore