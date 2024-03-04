import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, Spinner, Text, Tooltip, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDisclosure } from "@chakra-ui/react";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import axios from "axios";
import { BASE_URL } from "../services/helper";
import { useDispatch, useSelector } from "react-redux";
import { allChats, notificationUpdate, selectedChat } from "../actions/chatsAction";
import { BellIcon } from "@chakra-ui/icons";
import { getSender } from "../services/chatLogic";
import NotificationBadge, { Effect } from "react-notification-badge";

const SideDrawer = (props) => {

    const {chats,notification } = useSelector((state) => {
        return {
            chats:state.chats.allChats,
            notification: state.chats.notification
        }
    })

    const { users } = props
    console.log('check users inside the Side drawer', users)
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()

    const handleSearch = (e) => {
        if (!search) {
            toast({
                title: 'Please enter something in the search',
                status: 'warning',
                duration: '5000',
                isClosable: true,
                position: 'top-left'
            })
            return
        }

        if (search.length > 1) {
            setLoading(true)

            setTimeout(() => {
                const filteredUsers = users.filter((user) => {
                    return user.username.includes(search)
                })
                console.log('filterd user', filteredUsers)
                setLoading(false)
                setSearchResult(filteredUsers)
            }, 2000)
        }
    }

    const accessChat = async (id) => {
        try {
            setLoadingChat(true)
            const { data } = await axios.post(`${BASE_URL}/scout/chat`, { userid: id }, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log('data in access chat', data)

            if(!chats.find((c) => c._id === data._id)){
                console.log('data check me',[data,...chats])
                dispatch(allChats([data,...chats]))
            }

            dispatch(selectedChat(data))
            setLoading(false)
            onClose()
        }
        catch (err) {
            toast({
                title: 'error in fetching the chats',
                description:err.message,
                status: 'warning',
                duration: '5000',
                isClosable: true,
                position: 'top-left'
            })
        }
    }

    return (
        <>
            <Box display='flex'
                justifyContent='space-between'
                alignItems='center'
                bg='lightgreen'
                width='100%'
                padding='5px 10px 5px 10px'
                borderWidth='5px'
            >
                <Tooltip label='search users to chat' hasArrow placement="bottom-end">
                    <Button variant='ghost' onClick={onOpen}>
                        <Text px='4'>Search users</Text>
                    </Button>
                </Tooltip>
                <Text fontSize='2xl' >
                    Scout-friends
                </Text>

                <Menu>
                    <MenuButton 
                        p={1}
                    >   
                        <NotificationBadge
                            count={notification.length}
                            effect={Effect.SCALE}
                        />
                        <BellIcon fontSize='2xl' m={1} />
                    </MenuButton>
                    <MenuList pl={2}>
                        {!notification.length && 'No new messages'}
                        {notification.map(notif => (
                            <MenuItem
                                key={notif._id}
                                onClick={() => {
                                    dispatch(selectedChat(notif.chat))
                                    dispatch(notificationUpdate(notification.filter((n) => {
                                        return n !== notif
                                    })))
                                }}
                            >
                                {notif.chat.isGroupChat ? `New Message in ${notif.chat.chatName}`:` New message from ${notif.sender.username}`}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>

                <Link to='/home'>
                    <Button>Back</Button>
                </Link>
            </Box>
            <Drawer placement="left"
                onClose={onClose}
                isOpen={isOpen}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
                    <DrawerBody>
                        <Box display='flex' paddingBottom='2'>
                            <Input placeholder="search by name"
                                value={search}
                                mr={2}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>Find</Button>
                        </Box>
                        {
                            loading ? (
                                <ChatLoading />
                            ) : (
                                searchResult?.map((user) => {
                                    return (
                                        <UserListItem
                                            key={user._id}
                                            user={user}
                                            handleFunction={() => accessChat(user._id)}
                                        />
                                    )
                                })
                            )
                        }
                        {
                            loadingChat && <Spinner ml='auto' d='flex' />
                        }
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </>
    )
}

export default SideDrawer