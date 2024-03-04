import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideDrawer from "./SideDrawer";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { selectedChat, startGetAllChats } from "../actions/chatsAction";

const ChatPage = (props) => {

    const [fetchAgain , setFetchAgain] = useState(false )
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetAllChats())
    },[fetchAgain])

    const updateFetchAgain = (value) => {
        setFetchAgain(value)
    }

    const updateSelectedChat = (chatToUpdate) => {
        dispatch(selectedChat(chatToUpdate))   
    }

    const { users , chats} = useSelector((state) => {
        return {
            users: state.users.allUsers,
            chats: state.chats.allChats
        }
    })


    let players
    
    if (users) {
        players = users.filter((ele) => {
            return ele.role === 'player'
        })
    }

    console.log('chats inside chat page', chats)

    return (
        <div>
            { players && <SideDrawer users={users.filter((ele) => {
                return ele.role === 'player'
            })}/>}
            <Box 
                display="flex"
                justifyContent='space-between'
                width='100%'
                height='78.5vh'
                padding='10px'
            >
                { players && <MyChats fetchAgain={fetchAgain} updateFetchAgain={updateFetchAgain}/>}
                { players && <ChatBox fetchAgain={fetchAgain} updateFetchAgain={updateFetchAgain} />}
            </Box>
        </div>
    )
}

export default ChatPage