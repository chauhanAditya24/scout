import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useSelector} from 'react-redux'

const ListingUsers = (props) => {
    // const [ users , setUsers ] = useState([])   
    
    const users = useSelector((state)=>{
        return state
    })
    
    console.log(users)

    // const listAllUsers = () => {
    //     axios.get('http://localhost:3088/scout/list')
    //         .then((user) => {
    //             console.log(user)
    //             setUsers(user.data)
    //         })
    //         .catch((err) => {
    //             console.log(err.message)
    //         })
    // } 

    // const handleClick = () => {
    //     listAllUsers()
    // }

    // const hanldeRemoveClick = (id) => {
    //     axios.delete(`http://localhost:3088/scout/remove/${id}`)
    //         .then((res) => {
    //             console.log('delted account : ',res.data)
    //             listAllUsers()
    //         })
    //         .catch((err) => {
    //             console.log(err.message)
    //         })
    // }
    

//     return (
//         <div>
//             <h1>Listing Users {users.length > 0 && users.length}</h1>
//             <button onClick={handleClick}> show users </button>
//             {
//                 users.length > 0 && (
//                     <div>
//                         <ul>
//                             {
//                                 users.map((ele) => {
//                                     return <li key={ele._id}>{ele.username} <button onClick={() => {
//                                         hanldeRemoveClick(ele._id)
//                                     }}> remove </button></li>
//                                 })
//                             }
//                         </ul>
//                     </div>
//                 )
//             }
//         </div>
//     )
// }




return (
    <div>
        <h1>testing the store</h1>
    </div>
)
}

export default ListingUsers