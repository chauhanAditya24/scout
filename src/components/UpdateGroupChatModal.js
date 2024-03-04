import { ViewIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserBadgeItem from "./UserBadgeItem";
import UserBadgeItem2 from "./UsersBadgeItem2";
import axios from "axios";
import { BASE_URL } from "../services/helper";
import { selectedChat, startGetAllChats } from "../actions/chatsAction";
import UserListItem from "./UserListItem";

const UpdateGroupChatModal = (props) => {

    const { fetchAgain, updateFetchAgain, fetchMessages } = props

    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch = useDispatch()
    const { selectedChats, allUsers, user } = useSelector((state) => {
        return {
            selectedChats: state.chats.selectedChat,
            allUsers: state.users.allUsers,
            user: state.users.currentUser
        }
    })

    // const chatToTest = selectedChats

    // console.log('selected chat items inside UGCM', selectedChats)

    const [groupChatName, setGroupChatName] = useState('')
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameLoading, setRenameLoading] = useState(false)

    const toast = useToast()

    const handleRemove = async (userToRemove) => {
        console.log('USer to remove', userToRemove)
        if (selectedChats.groupAdmin !== user._id && userToRemove !== user._id) {
            toast({
                title: 'Only admins can remove',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }

        try {
            setLoading(true)

            const sendData = {
                chatId: selectedChats._id,
                userId: userToRemove
            }

            const { data } = await axios.put(`${BASE_URL}/scout/group/remove`, sendData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })

            // console.log('data aditya check' , data)
            // console.log('user to remove ' , userToRemove)
            // userToRemove === user._id ? dispatch(selectedChat({})) : dispatch(selectedChat(data))
            onClose()
            dispatch(startGetAllChats())
            dispatch(selectedChat({}))
            // dispatch(selectedChat(data))
            fetchMessages()
            setLoading(false)

        }
        catch (err) {
            toast({
                title: 'Error occured',
                description: err.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setRenameLoading(false)
        }
    }

    const findUserId = (id) => {
        const arr = allUsers.filter((ele) => {
            return ele._id === id
        })
        // console.log('arrraayayyaayya', arr)
        return arr[0]
    }

    const hanldeRename = async () => {
        if (!groupChatName) return

        try {
            setRenameLoading(true)
            const sendData = {
                chatId: selectedChats._id,
                name: groupChatName
            }
            const { data } = await axios.put(`${BASE_URL}/scout/chat/rename`, sendData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })

            dispatch(selectedChat(data))
            dispatch(startGetAllChats())
            // updateFetchAgain(!fetchAgain)
            setRenameLoading(false)
        }
        catch (err) {
            toast({
                title: 'Error occured',
                description: err.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setRenameLoading(false)
        }
        setGroupChatName('')
    }

    const handleSearch = (query) => {
        setSearch(query)
        if (!query) {
            return
        }

        if (search.length > 1) {
            setLoading(true)

            const filteredUsers = allUsers.filter((user) => {
                return user.username.includes(search)
            })
            // console.log('filterd user', filteredUsers)
            setLoading(false)
            setSearchResult(filteredUsers)
        }
    }

    const handleAddUser = async (userToAdd) => {
        // console.log('selected Chat ss users , ' , selectedChat.users)

        // console.log('ajay 11 ', selectedChats.users)
        // console.log(userToAdd._)

        if (selectedChats.users.find((u) => {
            return u === userToAdd._id
        })
        ) {
            toast({
                title: 'User already added',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return
        }

        if (selectedChats.groupAdmin !== user._id) {
            toast({
                title: 'Only admin can add',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return
        }

        try {
            setLoading(true)

            const sendData = {
                chatId: selectedChats._id,
                userId: userToAdd._id
            }

            const { data } = await axios.put(`${BASE_URL}/scout/group/add`, sendData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })

            console.log('wana checn tha data', data)
            onClose()
            dispatch(startGetAllChats())
            // dispatch(selectedChat(data))
            dispatch(selectedChat({}))
            setLoading(false)

        }
        catch (err) {
            toast({
                title: 'Error occured',
                description: err.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setRenameLoading(false)
        }

    }

    return (
        <>
            <IconButton display={{ base: 'flex' }} icon={<ViewIcon />} onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize='35px'
                        display='flex'
                        justifyContent='center'
                    >{selectedChats.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            w='100%'
                            display='flex'
                            flexWrap='wrap'
                            pb={3}
                        >
                            {
                                selectedChats.users.map((user, i) => {
                                    return (
                                        <UserBadgeItem2
                                            key={user + i}
                                            user={user}
                                            handleFunction={() => handleRemove(user)}
                                        />
                                    )
                                })
                            }
                        </Box>

                        <FormControl display='flex'>
                            <Input
                                placeholder="chat name"
                                mb={3}
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <Button
                                variant='solid'
                                colorScheme="teal"
                                ml={1}
                                isLoading={renameLoading}
                                onClick={hanldeRename}
                            >
                                Update
                            </Button>
                        </FormControl>

                        <FormControl display='flex'>
                            <Input
                                placeholder="add user to group"
                                mb={3}
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            {/* <Button
                                variant='solid'
                                colorScheme="teal"
                                ml={1}
                                isLoading={renameLoading}
                                onClick={hanldeRename}
                            >
                                Update
                            </Button> */}
                        </FormControl>

                        {
                            loading ? (
                                <Spinner size='lg' />
                            ) : (
                                searchResult?.map((ele) => {
                                    return (
                                        <UserListItem
                                            key={ele._id}
                                            user={ele}
                                            handleFunction={() => handleAddUser(ele)}
                                        />
                                    )
                                })
                            )
                        }

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' onClick={() => handleRemove(user)}>
                            Leave group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModal