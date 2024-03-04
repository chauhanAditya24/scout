import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../services/helper'

const ChatSearch = (props) => {
    const { users, updateMembers } = props
    const [memberArr, setMemberArr] = useState([])
    console.log('chat iser', users)

    const handleClick = (user, e) => {
        e.preventDefault()
        console.log('user in hanlde click', user)

        console.log('memberArr inside', memberArr)

        let check = false

        for (let i = 0; i < memberArr.length; ++i) {
            if (memberArr[i].userId === user._id) {
                check = true
                break
            }
        }

        // memberArr.forEach((ele) => {
        //     console.log('for each ', ele.userId, user._id)
        //     if (ele.userId === user._id) {
        //         check =  true
        //         break;
        //     }
        // })

        if (check) {
            alert('Already added the member')
        } else {
            const body = {
                userId: user._id,
                name: user.username
            }
            const temp = [...memberArr]
            temp.push(body)
            setMemberArr(temp)
            updateMembers(temp)
        }
    }

    const handleRemove = (id) => {
        const temp = memberArr.filter((ele) => {
            return ele.userId !== id
        })
        setMemberArr(temp)
        updateMembers(temp)
    }

    console.log('memberArr', memberArr)
    return (
        <div>
            <div>
                <h4>members</h4>
                <div>
                    {
                        memberArr.map((ele) => {
                            return (
                                <div key={ele.userId}>
                                    {ele.name}
                                    <button onClick={() => { handleRemove(ele.userId) }}> Remove from group</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                users.map((user) => {
                    return (
                        <div key={user._id} className="card" style={{ width: "10rem" }}>
                            <img src={`http://localhost:3088/images/${user.profilePicture}`} alt={`${user.username}`} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{user.username}</h5>
                                <button className='btn btn-success' onClick={(e) => { handleClick(user, e) }}> Add </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ChatSearch