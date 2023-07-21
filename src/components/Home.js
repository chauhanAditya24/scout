import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Home component </h1>
            <span><Link to='/players'> Players </Link> | <Link to='/grounds'> Grounds </Link></span>
        </div>
    )
}

export default Home