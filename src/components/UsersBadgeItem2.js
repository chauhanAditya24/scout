import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const UserBadgeItem2 = (props) => {

    const { allUsers, currUser} = useSelector((state) => {
        return {
            allUsers:state.users.allUsers.filter((ele) => {
                return ele.role === 'player'
            }),
            currUser: state.users.currentUser
        }
    })

    const { user , handleFunction} = props
    // console.log('++++++++++++++++++++++++++++++++++++++')
    // console.log('all users' , typeof user)
    // allUsers.forEach((ele) => {
    //     console.log('ele _id' , typeof ele._id )    
    // })

    let obj = {}

    if(currUser._id === user){
        obj.username='you'
    }else{
        allUsers.forEach((ele) => {
            if(ele._id === user){
                obj = {...ele}
            }
        })
    }

    // console.log('obj' , obj)

    // console.log('arr insdie 2',arr)

    // const obj = arr[0]

    return (
        <Box
            px={2}
            py={1}
            borderRadius='lg'
            m={1}
            mb={2}
            fontSize={12}
            backgroundColor='green'
            color='white'
            cursor='pointer'
            onClick={handleFunction}
        >
            {obj.username}
            <CloseIcon pl={1} />
        </Box>
    )
}

export default UserBadgeItem2