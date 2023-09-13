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
import UpdateProfilePicture from './UpdateProfilePicture'
import BookingList from './BookingList'
import UpdateGroundPicture from './UpdateGroundPicture'
import '../css/navbar.css'
import '../css/profilePicture.css'
import DeleteUserAccount from './DeleteUserAccount'
import ViewAllUsers from './ViewAllUsers'


const NavBar = (props) => {
    const { loggedIn, user } = useSelector((state) => {
        return {
            loggedIn: state.users.loggedIn,
            user: state.users.currentUser
        }
    })

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
                        {loggedIn === true ? (
                            <>
                                <li style={{ paddingTop: '20px' }} className='navbar-links'><Link to='/home'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                                </svg> Home </Link></li>
                                <li style={{ paddingTop: '20px' }} className='navbar-links'><Link to='/account'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-badge" viewBox="0 0 16 16">
                                    <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
                                </svg> Account </Link>
                                </li>
                                <li style={{ paddingTop: '20px' }} className='navbar-links'><Link to='/logout'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                                    <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                                </svg> Logout</Link></li>
                                <li className='navbar-links' style={{ paddingTop: '20px' }}> <Link to='/booking/list'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                                </svg> Booking</Link> </li>

                            </>
                        ) : (
                            <>
                                <li style={{ paddingTop: '20px' }} className='navbar-links'><Link className='navbar-links' to='/register'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard2-plus-fill" viewBox="0 0 16 16">
                                    <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
                                    <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5ZM8.5 6.5V8H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V9H6a.5.5 0 0 1 0-1h1.5V6.5a.5.5 0 0 1 1 0Z" />
                                </svg> Register </Link></li>
                                <li style={{ paddingTop: '20px' }} className='navbar-links'><Link className='navbar-links' to='/'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                                    <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                </svg> Login </Link></li>
                            </>
                        )}
                        <li style={{ paddingTop: '20px' }} className='navbar-links'><a className='navbar-links' href='https://www.linkedin.com/in/aditya-chauhan-0a3544195/' target='_blank' rel="noopener"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                        </svg> Contact us</a></li>
                    </ul>
                </nav>
            </header>

            <Route path='/home' component={Home} exact={true} />
            <Route path='/register' component={Register} exact={true} />
            <Route path='/' component={Login} exact={true} />
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
            <Route path='/booking/list' component={BookingList} exact={true} />
            <Route path='/update/profilePicture' component={UpdateProfilePicture} exact={true} />
            <Route path='/update/groundPicture' component={UpdateGroundPicture}  exact={true}/>
            <Route path='/delete/account' component={DeleteUserAccount} exact={true}/>
            <Route path='/admin/view/details' component={ViewAllUsers} exact={true} />
        </div>
    )
}

export default NavBar