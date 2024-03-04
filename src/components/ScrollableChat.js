import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../services/chatLogic";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrollableChat = (props) => {
    const { messages, currUser } = props
    return (
        <ScrollableFeed>
            {messages && messages.map((m, i) => {
                return <div
                    key={m._id}
                    style={{ display: 'flex' }}
                >
                    {
                        (isSameSender(messages, m, i, currUser._id) || isLastMessage(messages, i, currUser._id)) && (
                            <Tooltip
                                label={m.sender.username}
                                placement="bottom-start"
                                hasArrow
                            >
                                <Avatar
                                    mt='7px'
                                    mr={1}
                                    size='sm'
                                    name={m.sender.username}
                                    src={m.sender.profilePicture}
                                />

                            </Tooltip>
                        )
                    }

                    <span
                        style={{
                            backgroundColor: `${m.sender._id === currUser._id ? '#BEE3F8' : '#B9F5D0'
                                }`,
                            borderRadius: '20px',
                            padding: '5px 15px',
                            maxWidth: '75%',
                            marginLeft: isSameSenderMargin(messages, m, i, currUser._id),
                            marginTop: isSameUser(messages, m, i, currUser._id) ? 3 : 10
                        }}
                    >
                        {m.content}
                    </span>

                </div>
            })}
        </ScrollableFeed>
    )

}


export default ScrollableChat