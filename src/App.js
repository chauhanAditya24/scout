import React , {useEffect}from 'react'
import NavBar from './components/NavBar'
import { useDispatch } from 'react-redux'
import {updateLoggedIn} from './actions/usersAction'

const App = (props) => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.getItem('token')){
      dispatch(updateLoggedIn(true))
    }
  },[dispatch])
  

  return (
    <div>
      <h1> the scout project</h1>
      <NavBar/>
    </div>
  )

}

export default App