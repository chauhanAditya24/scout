import React from "react"
import { useSelector } from "react-redux"
import WhatsappLink from './WhatsappLink'

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

                        <p> Description and image tag will be here</p>


                        <WhatsappLink/>
                        <br/>
                        <button onClick={() => {
                            props.history.push('/list/players')
                        }}>back</button>
                    </>
                )
            }
        </div>
    )
}

export default ListSelectedUser