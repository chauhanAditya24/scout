import React from "react"
import { useSelector } from "react-redux"
import { BASE_URL } from "../services/helper"
// import WhatsappLink from './WhatsappLink'

const ListSelectedUser = (props) => {

    const player = useSelector((state) => {
        return state.users.selectedPlayer
    })

    console.log(player)

    const link = 'https://wa.me/91' + player.phone + '?text=Hi saw you profile on scout are you available for a game?'

    return (
        <div style={{ marginLeft: '30px', marginTop: '10px' }}>
            {/* <h1>selected user component</h1> */}
            {
                player && (
                    <>
                        {/* <h3>{player.username}</h3> */}
                        <div className="row">
                            <div className="col md-6">
                                <div>
                                    <figure className="figure">
                                        <img style={{borderRadius:'10px'}} width='500' height='500' src={player.profilePicture} alt={`${player.username}`} />
                                    </figure>
                                </div>
                            </div>
                            <div style={{borderRadius:'10px', paddingTop: '10px', paddingLeft: '20px', marginRight: '200px', marginTop: '50px', marginBottom: '100px', border: '2px solid', backgroundColor: '#f5f5f5' }} className="col md-6">
                                <h3> Name - {player.username}</h3>
                                <h3> City -{player.city}</h3>
                                <h3> Sport - {player.sport}</h3>
                                <h3> About me - {player.bio}</h3>
                                <br />
                                <div>
                                    <a href={link} target='_blank' rel="noreferrer"> <button className="btn-sm" style={{ border: 'white' }}> <img height='50px' width='230px' src={require('../images/WhatsAppButtonGreenSmall.png')} alt={`${player.username}`} /> </button></a>

                                    <button style={{ marginLeft: '15px' }} className="btn btn-secondary btn-lg" onClick={() => {
                                        props.history.push('/list/players')
                                    }}> back </button>
                                </div>


                            </div>

                        </div>


                        {/* <WhatsappLink props={player.phone}/> */}
                    </>
                )
            }
        </div>
    )
}

export default ListSelectedUser


{/* <img style={{borderRadius:'10px'}} width='500' height='500' src={`${BASE_URL}/images/${player.profilePicture}`} alt={`${player.username}`} /> */}