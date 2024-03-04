import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"



const FollowersData = (props) => {

    const { followers } = useSelector((state) => {
        return {
            followers:state.users.usersFollowers
        }
    })
    // const element = <p>check</p>
    const [element ,setElement] = useState(null)
    // let element  

    useEffect(() => {
        if(followers.length == 0){
            setElement( <p>0 followers</p>)
        }
        else if(followers.length === 1){
            setElement(<p> {followers[0].username} follows you.</p>)
        }else if(followers.length == 2){
            setElement(<p> {followers[0].username} and {followers[1].username} follows you.</p>)
        }else{
            setElement(<p>{followers[0].username} and {followers.length -1} follower.</p>)
        }
    },[followers])


    console.log('people following manik are : ' , followers)
    
    return element
}

export default FollowersData