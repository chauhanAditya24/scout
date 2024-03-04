import { Box, StackDivider, VStack, Button, useToast, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../services/helper'
import { removeFollowing, removedFollower } from '../actions/usersAction'

const ShowFollowers = () => {
    const dispatch = useDispatch()
    const { followers, following } = useSelector((state) => {
        return {
            followers: state.users.usersFollowers,
            following: state.users.usersFollowing
        }
    })

    const toast = useToast()

    // console.log(' ----------------------------- ', followers)

    const handleFollowingRemove = (id) => {
        const data = { idToRemove: id }
        axios.put(`${BASE_URL}/scout/remove/following`, data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                dispatch(removeFollowing(res.data.updatedFollowing))
                if (res.data.message === 'success') {
                    toast({
                        title: 'follower removed',
                        description: 'successfully unfollowed',
                        status: 'success',
                        duration: '5000',
                        isClosable: true,
                        position: 'top'
                    })
                } else {
                    toast({
                        title: 'something went wrong',
                        status: 'error',
                        duration: '5000',
                        isClosable: true,
                        position: 'top'
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleFollowerRemove = (id) => {
        // console.log(' id insie the handleREMove', id)
        const data = { idToRemove: id }
        axios.post(`${BASE_URL}/scout/remove/followers`, data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log('res data in handle REmove', res.data.message)
                dispatch(removedFollower(res.data.updatedFollowers))
                if (res.data.message === 'success') {
                    toast({
                        title: 'follower removed',
                        description: 'successfully removed the follower',
                        status: 'success',
                        duration: '5000',
                        isClosable: true,
                        position: 'top'
                    })
                } else {
                    toast({
                        title: 'something went wrong',
                        status: 'error',
                        duration: '5000',
                        isClosable: true,
                        position: 'top'
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <SimpleGrid columns={2} spacing={10}>
                <VStack
                    divider={<StackDivider borderColor='gray.200' />}
                    spacing={4}
                    width={600}
                    align='stretch'
                    marginLeft={10}
                    marginTop={5}
                // borderRadius='10px'
                // border='2px solid gray'
                >
                    <h3 style={{ marginLeft: '40px', marginTop: '20px' }}>All people following you </h3>
                    {
                        followers.map((user) => {
                            return (
                                <Box
                                    marginTop='10px'
                                    marginBottom='10px'
                                    marginLeft='20px'
                                    width='520px'
                                    height={30}
                                    paddingLeft='7px'
                                    h='40px'
                                    key={user.id}
                                    bg='gray.100'
                                >
                                    <span
                                        style={{
                                            marginLeft: '10px'
                                        }}
                                    >{user.username}</span>
                                    {/* <Link to='/list/players'>
                                    <Button marginLeft={10} colorScheme='green'>view</Button>
                                </Link> */}
                                    <Button
                                        onClick={() => handleFollowerRemove(user.id)}
                                        marginLeft={10} colorScheme='red'> remove follower</Button>
                                </Box>
                            )

                        })
                    }
                </VStack>
                <VStack
                    divider={<StackDivider borderColor='gray.200' />}
                    spacing={4}
                    width={600}
                    align='stretch'
                    marginLeft={10}
                    marginTop={5}
                // borderRadius='10px'
                // border='2px solid gray'
                >
                    <h3 style={{ marginLeft: '40px', marginTop: '20px' }} >People you are following</h3>
                    {
                        following.map((user) => {
                            return (
                                <Box
                                    marginTop='10px'
                                    marginBottom='10px'
                                    marginLeft='20px'
                                    width='520px'
                                    height={30}
                                    paddingLeft='7px'
                                    h='40px'
                                    key={user.id}
                                    bg='gray.100'
                                >
                                    <span
                                        style={{
                                            marginLeft: '10px'
                                        }}
                                    >{user.username}</span>
                                    {/* <Link to='/list/players'>
                                    <Button marginLeft={10} colorScheme='green'>view</Button>
                                </Link> */}
                                    <Button
                                        onClick={() => handleFollowingRemove(user.id)}
                                        marginLeft={10} colorScheme='red'> remove following</Button>
                                </Box>
                            )

                        })
                    }
                </VStack>
            </SimpleGrid>
        </div>
    )

}

export default ShowFollowers