import React from 'react'
import { Link, Route } from 'react-router-dom'
import Register from './components/Register'
import ListingUsers from './components/ListingUsers'
import Home from './components/Home'
import Login from './components/Login'
import RegisterGround from './components/RegisterGround'

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
    </div>
  )

}

export default App