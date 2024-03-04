import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '../services/helper'
import MessageChat from './MessageChat'
import { useSelector } from 'react-redux'

//
// import { useSocketListener } from '../services/socket'
//

const Group = (props) => {

    const [groups, setGroups] = useState([])
    const user = useSelector((state) => {
        return state.users.currentUser
    })

    console.log(" Group User: ", user)

    // useEffect(() => {
    //     const fetchGroups = async () => {
    //         try {
    //             console.log('inside the ')
    //             const response = await axios.get(`${BASE_URL}/scout/Group`, {
    //                 headers: {
    //                     'Authorization': localStorage.getItem('token')
    //                 }
    //             });
    //             console.log('Group: ', response.data);
    //             setGroups(response.data);
    //         } catch (error) {
    //             console.log('Error fetching groups: ', error);
    //         }
    //     }
    //     fetchGroups()
    // }, []); // F

    useEffect(() => {
            console.log('calling use effect')
            axios.get(`${BASE_URL}/scout/Group`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then((res) => {
                    console.log('Group : ', res.data)
                    setGroups(res.data)
                })
                .catch((err) => {
                    console.log('error Group : ', err)
                })
    }, [])

    // useSocketListener('newGroup', (newGroup) => {
    //     setGroups((prevGroups) => [...prevGroups,newGroup])
    // })


    return (
        <div className='container'>
            <h3>Group</h3>

            {
                groups.length > 0 ? (
                    <div>
                        {
                            groups.map((ele) => {
                                return <MessageChat key={ele._id} id={user._id} groupId={ele._id} name={user.username} data={ele} />
                            })
                        }
                    </div>
                ) : <p>Please create your group</p>
            }
        </div>
    )
}


export default Group