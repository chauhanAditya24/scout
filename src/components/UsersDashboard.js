import React, { useEffect } from 'react'
import EditDetails from './EditDetails'
import { useDispatch } from 'react-redux'
import { startGetGrounds } from '../actions/groundsAction'

const UsersDashboard = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetGrounds())
    }, [dispatch])

    return (
        <div>
            <EditDetails/>
        </div>
    )


}

export default UsersDashboard