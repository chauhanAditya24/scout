import React from 'react'
import { useSelector } from 'react-redux'

const UsersHomePage = (props) => {
   const user = useSelector((state) => {
    return state.users.currentUsers
   }) 

   console.log('user inside the usersHomePage' , user)

    return(
       <div>
        
       </div> 
    )
}

export default UsersHomePage