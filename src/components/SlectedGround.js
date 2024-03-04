import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SelectedGround = (props) => {

    const ground = useSelector((state) => {
        // console.log(' inside the useSelector inside the selected ground componenet ' , state.ground)
        return state.grounds.selectedGround
    })

    console.log('i was here')

    return (
        <div>
            <h3>selected ground component</h3>
            <div className='card' style={{width: '18rem' }}>
                <div className='card-header'>{ground.name}</div>
                    <span>{ground.location}</span>
                    <span>{ground.price} per person</span>
                    <span>{ground.timings}</span>
            </div>
            <br/>
            <br/>
            <Link to='/grounds/all'><button> back </button></Link>
        </div>
    )
}

export default SelectedGround