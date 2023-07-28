import React from "react"
import { useSelector } from "react-redux"

const ListSelectedUser = (props) => {

    const player = useSelector((state) => {
        return state.users.selectedPlayer
    })

    console.log(player)

    return (
        <div>
            <h1>selected user component</h1>
            {
                player && (
                    <>
                        <h3>{player.username}</h3>
                    </>
                )
            }
        </div>
    )
}

export default ListSelectedUser