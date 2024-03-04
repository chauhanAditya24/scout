import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserListItem from "./UserListItem";
import UserBadgeItem from "./UserBadgeItem";
import axios from "axios";
import { BASE_URL } from "../services/helper";
import { allChats } from "../actions/chatsAction";

const GroupChatModal = ({ children }) => {
    
    const dispatch = useDispatch()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { chats, currUser, allUsers } = useSelector((state) => {
        return {
            chats: state.chats.allChats,
            currUser: state.users.currentUser,
            allUsers: state.users.allUsers.filter((ele) => {
                return ele.role === 'player'
            })
        }
    })

    const [groupChatNames, setGroupChatNames] = useState('')
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    const toast = useToast()

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
            console.log('filterd user', filteredUsers)
            setLoading(false)
            setSearchResult(filteredUsers)
        }
    }

    const handleSubmit = async() => {
        if(!groupChatNames || !selectedUsers){
            toast({
                title:'please fill all the feilds',
                status:'warning',
                duration:5000,
                isClosable:true,
                position:'top'
            })
            return ;
        }

        try{   
            const sendData = {
                name:groupChatNames,
                users:selectedUsers.map((ele) => {
                    return ele._id
                })
            }
            const {data} = await axios.post(`${BASE_URL}/scout/chat/group`,sendData,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            const newChats = [data,...chats]
            dispatch(allChats(newChats))
            onClose()

            toast({
                title:'New group created',
                status:'success',
                duration:5000,
                isClosable:true,
                position:'bottom'
            })
        }
        catch(err){
            toast({
                title:'failed to create the chat',
                description: err.response.data,
                status:'error',
                duration:5000,
                isClosable:true,
                position:'bottom'
            })
        }

    }

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: 'User already exist',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top'
            })
            return
        }

        setSelectedUsers([...selectedUsers, userToAdd])
        setSearch('')

    }

    const handleDelete = (userToRemove) => {
        const temp = selectedUsers.filter((user) => {
            return user._id !== userToRemove._id
        })
        // console.log('temp ', temp)
        setSelectedUsers(temp)
    }

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize='35px'
                        d='flex'
                        justifyContent='center'
                    >Create Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        d='flex'
                        flexDir='column'
                        alignItems='center'
                    >

                        <FormControl>
                            <Input placeholder="chat name" mb={3}
                                onChange={(e) => { setGroupChatNames(e.target.value) }}
                            />
                        </FormControl>

                        <FormControl>
                            <Input placeholder="add users" mb={1}
                                onChange={(e) => { handleSearch(e.target.value) }}
                            />
                        </FormControl>
                        <Box w='100%' display='flex' flexWrap='wrap' >
                            {
                                selectedUsers.map((user) => {
                                    return (
                                        <UserBadgeItem key={user._id} user={user} handleFunction={() => handleDelete(user)} />
                                    )
                                })
                            }
                        </Box>
                        {
                            loading ? <div>loading</div> : (
                                searchResult?.slice(0, 4).map(user => (
                                    <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                                ))
                            )
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Create chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal