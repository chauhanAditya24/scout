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
import ListSelectedUser from './ListSelectedUser'
import ListSelectedGround from './ListSelectedGround'
import EditUsersGroundDetails from '../components/EditUsersGroundDetails'
import GroundEdit from './GroundEdit'
import BookingPage from './BookingPage'
import '../css/navbar.css'

const NavBar = (props) => {
    const loggedIn = useSelector((state) => {
        return state.users.loggedIn
    })


    console.log(loggedIn)

    return (
        <div className='border-radius'>
            <header className='headerNav'>

                <img
                    src={require('../images/scout.png')} 
                    alt='scout-logo'
                    className='logo'    
                />

                <nav className='navbar'>
                    <ul className='navbar-list'>
                        <li className='navbar-links'><Link  to='/'> Home </Link></li>
                        {loggedIn === true ? (
                            <>
                                <li className='navbar-links'><Link  to='/account'> Account </Link>
                                </li>
                                <li className='navbar-links'><Link to='/logout'>logout</Link></li>
                            </>
                        ) : (
                            <>
                                <li className='navbar-links'><Link className='navbar-links' to='/register'> Register </Link></li>
                                <li className='navbar-links'><Link className='navbar-links' to='/login'> Login </Link></li>
                            </>
                        )}
                        <li className='navbar-links'><a className='navbar-links' href='https://www.linkedin.com/in/aditya-chauhan-0a3544195/' target='_blank' rel="noopener"> Contact us</a></li>
                    </ul>
                </nav>
            </header>

            <Route path='/' component={Home} exact={true} />
            <Route path='/register' component={Register} exact={true} />
            <Route path='/login' component={Login} exact={true} />
            <Route path='/players' component={ListingUsers} exact={true} />
            <Route path='/grounds/register' component={RegisterGround} exact={true} />
            <Route path='/grounds/all' component={ShowGrounds} exact={true} />
            <Route path='/grounds/selectedGround' component={SelectedGround} exact={true} />
            <Route path='/logout' component={Logout} exact={true} />
            <Route path='/account' component={Account} exact={true} />
            <Route path='/edit' component={EditAccount} exact={true} />
            <Route path='/list/players' component={ListPlayers} exact={true} />
            <Route path='/list/specific/grounds' component={ListGround} exact={true} />
            <Route path='/list/selected/player' component={ListSelectedUser} exact={true} />
            <Route path='/ground/details' component={BookingPage} exact={true} />
            <Route path='/grounds/user/edit' component={EditUsersGroundDetails} exact={true} />
            <Route path='/edit/ground/details' component={GroundEdit} exact={true} />
        </div>
    )
}

export default NavBar