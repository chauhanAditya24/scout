import React from "react"
import { useSelector } from "react-redux"
// import WhatsappLink from './WhatsappLink'

const ListSelectedUser = (props) => {

    const player = useSelector((state) => {
        return state.users.selectedPlayer
    })

    console.log(player)

    const link = 'https://wa.me/91' + player.phone + '?text=Hi saw you profile on scout are you available for a game?'

    return (
        <div>
            <h1>selected user component</h1>
            {
                player && (
                    <>
                        <h3>{player.username}</h3>

                        <p> Description and image tag will be here</p>

                        <div className="row">
                            <div className="col md-6">
                                <div>
                                    <img width='500' height='500' src={`http://localhost:3088/images/${player.profilePicture}`} alt={`${player.username}`} />
                                </div>
                            </div>
                            <div className="col md-6">
                                <h3> Name - {player.username}</h3>
                                <h3> City -{player.city}</h3>
                                <h3> Sport - {player.sport}</h3>
                                <h3> About me - {player.bio}</h3>
                                <div>
                                    <a href={link} target='_blank' rel="noreferrer"> <button> Chat on WhatsApp </button></a>
                                </div>
                            </div>

                        </div>


                        {/* <WhatsappLink props={player.phone}/> */}


                        <br />
                        <button onClick={() => {
                            props.history.push('/list/players')
                        }}>back</button>

                        <br />
                    </>
                )
            }
        </div>
    )
}

export default ListSelectedUser