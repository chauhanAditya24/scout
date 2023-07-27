import React from 'react'
import { Link, Route } from 'react-router-dom'
import Register from './Register'
import ListingUsers from './ListingUsers'
import Home from './Home'
import Login from './Login'
import RegisterGround from './RegisterGround'
import ShowGrounds from './ShowGrounds'
import SelectedGround from './SlectedGround'
import { useSelector } from 'react-redux'
import Logout from './Logout'
import Account from './Account'
import EditAccount from './EditAccount'
import ListPlayers from './ListPlayers'
import ListGround from './ListGround'

const NavBar = (props) => {
    const loggedIn = useSelector((state) => {
        return state.users.loggedIn
    })  


    console.log(loggedIn)

    return (
        <div>
            <span>
                <Link to='/'> Home </Link> |
                { loggedIn === true ? (
                    <>
                        <Link to='/account'> Account </Link> |
                        <Link to='/logout'>logout</Link>
                    </>
                ) : (
                    <>
                    <Link to='/register'> Register </Link> |
                    <Link to='/login'> Login </Link>
                    </>
                )} 
            </span>

            <Route path='/' component={Home} exact={true}/>
            <Route path='/register' component={Register} exact={true}/>
            <Route path='/login' component={Login} exact={true}/>
            <Route path='/players' component={ListingUsers} exact={true}/>
            <Route path='/grounds/register' component={RegisterGround} exact={true}/>
            <Route path='/grounds/all' component={ShowGrounds} exact={true}/>
            <Route path='/grounds/selectedGround' component={SelectedGround} exact={true}/>
            <Route path='/logout' component={Logout} exact={true}/>
            <Route path='/account' component={Account} exact={true}/>
            <Route path='/edit' component={EditAccount} exact={true}/>
            <Route path='/list/players' component={ListPlayers} exact={true}/>
            <Route path='/list/specific/grounds' component={ListGround} exact={true}/>
        </div>
    )
}

export default NavBar