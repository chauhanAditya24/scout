import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = (props) => {

    const { user , handleFunction} = props
    console.log('user inside the userbadgeItem' , user)
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
            {user.username}
            <CloseIcon pl={1} />
        </Box>
    )
}

export default UserBadgeItem