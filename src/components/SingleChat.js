import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationUpdate, selectedChat, startGetAllChats } from "../actions/chatsAction";
import { getSender } from "../services/chatLogic";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import { BASE_URL } from "../services/helper";
import ScrollableChat from "./ScrollableChat";

import { io } from "socket.io-client";
const ENDPOINT = 'http://localhost:3088'
let socket, selectedChatCompare

const SingleChat = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetAllChats())
    }, [])

    const { fetchAgain, updateFetchAgain } = props
    const { selectedChats, currUser, allUsers, notification } = useSelector((state) => {
        return {
            selectedChats: state.chats.selectedChat,
            currUser: state.users.currentUser,
            notification: state.chats.notification,
            allUsers: state.users.allUsers.filter((ele) => {
                return ele.role === 'player'
            })
        }
    })

    console.log('******notig', notification)
    // const [length, setLength] = useState(0)

    // if(selectedChat.length !== undefined){
    //     setLength(1)
    // }

    const [socketConnected, setSocketConnected] = useState(false)

    const toast = useToast()
    // console.log("selected chats : ", selectedChats)

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessages, setNewMessages] = useState('')


    const fetchMessages = async () => {
        if (Object.keys(selectedChats).length === 0) {
            return
        }

        try {
            setLoading(true)
            const { data } = await axios.get(`${BASE_URL}/scout/allMessages/${selectedChats._id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            // console.log('single chat dat check', messages)
            setMessages(data)
            setLoading(false)
            socket.emit('join chat', selectedChats._id)
        }
        catch (err) {
            toast({
                title: 'Error Occured',
                description: 'Failed to load the message',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }


    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit('setup', currUser)
        socket.on('connection', () => {
            setSocketConnected(true)
        })

    }, [])


    useEffect(() => {
        fetchMessages()

        selectedChatCompare = selectedChats

    }, [selectedChats])

    // console.log('*********************', notification)

    useEffect(() => {
        socket.on('message recieved', (newMessageRecieved) => {
            
            // console.log('new msg recieved', newMessageRecieved)
            // !selectedChatCompare
            if (Object.keys(selectedChatCompare).length === 0 || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                
                console.log('notification should be updated')
                // const updatedNotification = [newMessageRecieved, ...notification]
                // dispatch(notificationUpdate(updatedNotification))
                // // dispatch(startGetAllChats())
                // updateFetchAgain(!fetchAgain)

                if (!notification.includes(newMessageRecieved)) {
                    console.log('notification not in the list')
                    dispatch(notificationUpdate([newMessageRecieved, ...notification]))
                    // dispatch(startGetAllChats())
                    updateFetchAgain(!fetchAgain)
                }
            } else {
                setMessages([...messages, newMessageRecieved])
            }
        })
    }, )


    const handleBack = () => {
        dispatch(selectedChat({}))
    }

    const sendMessage = async (e) => {
        if (e.key === 'Enter' && newMessages) {
            try {

                const sendData = {
                    content: newMessages,
                    chatId: selectedChats._id
                }
                setNewMessages('')

                const { data } = await axios.post(`${BASE_URL}/scout/messages`, sendData, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                // console.log('++++++++++++++',data)
                socket.emit('new message', data)
                setMessages([...messages, data])
            }
            catch (err) {
                toast({
                    title: 'error occured',
                    description: 'Failed to send message',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                })
            }
        }
    }

    const typingHandler = (e) => {
        setNewMessages(e.target.value)
    }

    return (
        <>
            {
                Object.keys(selectedChats).length ? (
                    <>
                        <Text
                            fontSize={{ base: '28px', md: '30px' }}
                            pb={3}
                            px={2}
                            w='100%'
                            display='flex'
                            justifyContent={{ base: 'space-between' }}
                            alignItems='center'
                        >
                            <IconButton
                                display={{ base: 'flex', md: 'none' }}
                                icon={<ArrowBackIcon />}
                                onClick={handleBack}
                            />

                            {
                                !selectedChats.isGroupChat ? (
                                    <>
                                        {getSender(currUser, selectedChats.users, allUsers)}
                                    </>
                                ) : (
                                    <>
                                        {selectedChats.chatName.toUpperCase()}
                                        {<UpdateGroupChatModal fetchAgain={fetchAgain} updateFetchAgain={updateFetchAgain}
                                            fetchMessages={fetchMessages}
                                        />}
                                    </>
                                )
                            }

                        </Text>

                        <Box
                            display='flex'
                            flexDirection='column'
                            justifyContent='flex-end'
                            p={3}
                            bg='#E8E8E8'
                            w='100%'
                            h='100%'
                            borderRadius='lg'
                            overflowY='auto'
                        >
                            {
                                loading ? (
                                    <Spinner
                                        size='xl'
                                        w={20}
                                        h={20}
                                        alignSelf='center'
                                        margin='auto'
                                    />
                                ) : (
                                    // <Box
                                    //     display='flex'
                                    //     flexDir='column'
                                    //     maxHeight='70vh'
                                    //     overflowY='scroll'
                                    // >
                                        <ScrollableChat
                                            // overflowY='auto'
                                            flex='1'
                                            currUser={currUser}
                                            messages={messages} />
                                    // </Box>
                                )
                            }
                            <FormControl onKeyDown={sendMessage}
                                isRequired
                                mt={3}
                            >
                                <Input
                                    variant='filled'
                                    bg='#E0E0E0'
                                    placeholder="enter a message"
                                    onChange={typingHandler}
                                    value={newMessages}
                                />
                            </FormControl>

                        </Box>

                    </>
                ) : (
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        h='100%'
                    >
                        <Text
                            fontSize='3xl'
                            pb={3}
                        >
                            Click on a user to start chatting
                        </Text>

                    </Box>
                )
            }
        </>
    )
}

export default SingleChat