import { Box } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleChat from "./SingleChat";

const ChatBox = (props) => {

    const { fetchAgain , updateFetchAgain} = props    

    const {selectedChat} = useSelector((state) => {
        return {
            selectedChat: state.chats.selectedChat   
        }
    })

    //
    const dispatch = useDispatch()

    const updateSelectedChat = (data) => {
        dispatch(selectedChat(data))
    }

    return (
        <Box 
            display={{base:selectedChat?'flex':'none', md:'flex'}}
            alignItems='center'
            flexDir='column'
            p={3}
            background='white'
            w={{base:'100%',md:'68%'}}
            borderRadius='lg'
            borderWidth='1px'
        >
            <SingleChat fetchAgain={fetchAgain} updateFetchAgain={updateFetchAgain} />
        </Box>
    )
}

export default ChatBox