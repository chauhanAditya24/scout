import React from 'react'
import { Link, Route } from 'react-router-dom'
import Register from './components/Register'
import ListingUsers from './components/ListingUsers'
import Home from './components/Home'
import Login from './components/Login'
import RegisterGround from './components/RegisterGround'
import ShowGrounds from './components/ShowGrounds'
import SelectedGround from './components/SlectedGround'

const App = (props) => {

  return (
    <div>
      <span>
        <Link to='/'> Home </Link> | 
        <Link to='/register'> Register </Link> |
        <Link to='/login'> Login </Link>
        </span>

      <Route path='/' component={Home} exact={true}/>
      <Route path='/register' component={Register} exact={true}/>
      <Route path='/login' component={Login} exact={true}/>
      <Route path='/players' component={ListingUsers} exact={true}/>
      <Route path='/grounds/register' component={RegisterGround} exact={true}/>
      <Route path='/grounds/all' component={ShowGrounds} exact={true}/>
      <Route path='/grounds/selectedGround' component={SelectedGround} exact={true}/>
    </div>
  )

}

export default App