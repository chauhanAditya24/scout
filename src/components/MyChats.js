import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatLoading from "./ChatLoading";
import { selectedChat, startGetAllChats } from "../actions/chatsAction";
import { getSender } from "../services/chatLogic";
import GroupChatModal from "./GroupChatModal";

const MyChats = (props) => {

    const toast = useToast()
    //
    const [selectedChatId , setSelectedChatId] = useState(null)

    const {fetchAgain , updateFetchAgain} = props
    const { chats, selectedChats ,currUser,allUsers} = useSelector((state) => {
        return {
            chats: state.chats.allChats,
            selectedChats: state.chats.selectedChat,
            currUser:state.users.currentUser,
            allUsers:state.users.allUsers.filter((ele) => {
                return ele.role === 'player'
            })
        }
    })

    const dispatch = useDispatch()

    // useEffect(() => {
    //     // dispatch(startGetAllChats())
    // }, [selectedChats])
    // console.log('ALLLLLLLLLL Users', allUsers)
    // console.log("SELECTEDDDDDDD CNATS", selectedChats)

    return (
        <Box
            d={{ base: selectedChats ? 'none' : 'flex', md: 'flex' }}
            flexDir='column'
            alignItems='center'
            p={3}
            bg='white'
            w={{ base: '100%', md: '31%' }}
            borderRadius='lg'
            borderWidth='1px'
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: '28px', md: '30px' }}
                d='flex'
                w='100%'
                justifyContent='space-between'
                alignItems='center'
            >
                My Chats
                <GroupChatModal >
                <Button
                    marginLeft='70px'
                    d='flex'
                    fontSize={{ base: '17px', md: '10px', lg: '17px' }}
                >
                    New Group Chat +
                </Button>
                </GroupChatModal>
            </Box>
            <Box
                d='flex'
                flexDir='column'
                p={3}
                bg='#F8F8F8'
                w='100%'
                h='100%'
                borderRadius='lg'
                overflowY='auto'
            >
                {
                    chats ? (
                        <Stack 
                            // overflowY='scroll'
                        >
                            {
                                chats.map((chat) => {
                                    // console.log('chat for adi,' , chat)
                                    return (
                                        <Box
                                            onClick={() => dispatch(selectedChat(chat))}
                                            cursor='pointer'
                                            bg={selectedChats === chat ? '#38B2AC':'#E8E8E8'}
                                            color={selectedChats === chat ? 'white' : 'black'}
                                            px={3}
                                            py={2}
                                            borderRadius='lg'
                                            key={chat._id}
                                        >
                                            <Text>
                                                {!chat.isGroupChat ? ( 
                                                    getSender(currUser,chat.users, allUsers)
                                                ) : chat.chatName}
                                            </Text>
                                        </Box>
                                    )
                                })
                            }
                        </Stack>
                    ): (
                        <ChatLoading/>
                    )
                }
            </Box>
        </Box>
    )
}

export default MyChats