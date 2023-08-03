import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
// import { startGetUsersGround } from '../actions/groundsAction'
// import { startGetEditGroundDetials } from '../actions/groundsAction'
import { addEditGround } from '../actions/groundsAction'

const EditUsersGroundDetails = (props) => {

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(startGetUsersGround())
    // }, [dispatch])

    const grounds = useSelector((state) => {
        return state.grounds.ownersGround
    })

    const handleClick = (id) => {
        const selectedGround = grounds.filter((ele) => {
            return id === ele._id
        })
        dispatch(addEditGround(selectedGround[0]))
    }

    // console.log('ownersGround',grounds)

    return (
        <div>
            <h1>listing your ground</h1>
            {
                grounds.map((ground) => {
                    return (
                        <h3 key={ground._id}>{ground.name}  <Link to='/edit/ground/details' onClick={() => {
                            handleClick(ground._id)
                        }}><button> edit ground details</button> </Link></h3>
                    )
                })
            }
        </div>
    )
}

export default EditUsersGroundDetails