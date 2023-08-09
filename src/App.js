import React , {useEffect}from 'react'
import NavBar from './components/NavBar'
import { useDispatch } from 'react-redux'
import {updateLoggedIn} from './actions/usersAction'
import { getCities} from './actions/citiesAction'
import { startGetSports } from './actions/sportsAction'
import './css/home.css'

const App = (props) => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.getItem('token')){
      dispatch(updateLoggedIn(true))
    }

    dispatch(getCities())
    dispatch(startGetSports())

  },[dispatch])
  

  return (
    <div className='home-body'>
      <NavBar/>
    </div>
  )

}

export default App