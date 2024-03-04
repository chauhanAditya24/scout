import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../services/helper";
import { v4 as uuidv4 } from 'uuid'
//
// import { useSocketEmitter } from "../services/socket";


const MessageChat = (props) => {
    const { data, id, name, groupId } = props
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState(data.messages)
    console.log('Message Chat', data.messages)

    // useSocketEmitter('join', {groupId, userId:id})

    // const uniqueId = () => {
    //     const id = uuidv4()
    //     console.log
    // }

    const handleMessage = (e) => {
        setMessage(e.target.value)
    }

    const handleSend = async (e) => {
        e.preventDefault()

        const sendData = {
            groupId,
            message,
            sender: name
        }

        // useSocketEmitter('newMessage' , sendData)

        // console.log('data send', sendData)
        // const temp = [...chat]
        // temp.push(sendData)
        // setChat(temp)
        setMessage('')
        try {
            await axios.post(`${BASE_URL}/scout/message`, sendData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then((res) => {
                    console.log('post apoi', res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        catch(e){
            console.log('e',e)
        }
    }

    return (
        <div className="container" style={{ border: '2px solid black' }}>
            <h4> {data.name}</h4>
            <h6> Chat </h6>
            {
                chat.map((ele) => {
                    const messageKey = uuidv4()
                    return (
                        <div key={messageKey}>
                            <h5>{ele.sender}: {ele.message} </h5>
                        </div>
                    )
                })
            }
            <form onSubmit={handleSend}>
                <input
                    type="text"
                    value={message}
                    onChange={handleMessage}
                />
                <input
                    className="btn btn-success"
                    type="submit"
                    value='send'
                />
            </form>
        </div>
    )
}

export default MessageChat