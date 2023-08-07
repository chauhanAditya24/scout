import React from 'react'
import { useSelector } from 'react-redux'

const ListSelectedGround = (props) => {

    const ground = useSelector((state) => {
        return state.grounds.specificGround
    })

    console.log('listing ground inside list selected ground',ground)

    const space = ground.slotType
    const startTime = Number(ground.timings.split(' ')[0])
    const endTime = Number(ground.timings.split(' ')[3])
    console.log('space', space)
    console.log('start time', startTime)
    console.log('end time', endTime)


    return (
        <div>
            <div className="card">
                <div className="card-header">
                <h2>{ground.name}</h2>
                </div>
                <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
            </div>
            {/* <h1>{ground.name}</h1>

            <div className='d grid gap-2 col-6 mx-auto'>
                <button className='btn btn-success'> book now</button>
            </div> */}

            <button onClick={() => {
                props.history.push('/list/specific/grounds')
            }}> back </button>
        </div>
    )
}

export default ListSelectedGround