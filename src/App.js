import React from 'react'
import Register from './components/Register'
import ListingUsers from './components/ListingUsers'

const App = (props) => {

  return (
    <div className='component'>
      <h1>App component</h1>
      <Register/>
      <ListingUsers/>
    </div>
  )

}

export default App