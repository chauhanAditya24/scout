import React from 'react'
import {Link} from 'react-router-dom'
import UsersDashboard from './UsersDashboard'

const Home = () => {
    return (
        <div>
            <h1>Home component </h1>
            <span><Link to='/players'> Players </Link> | <Link to='/grounds/all'> Grounds </Link></span>
            <UsersDashboard/>
        </div>
    )
}

export default Home