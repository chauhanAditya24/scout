import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BASE_URL } from '../services/helper'
import ChatSearch from './ChatSearch'
import { useSelector } from 'react-redux'

const Chat = (props) => {

    const [name, setName] = useState('')
    const [users, setUsers] = useState([])
    const [members, setMembers] = useState([])
    const [city, setCity] = useState('')
    const [sport, setSport] = useState('')

    const { cities, sports } = useSelector((state) => {
        return {
            cities: state.cities.cities,
            sports: state.sports.sports
        }
    })

    const updateMembers = (arr) => {
        setMembers(arr)
    }

    console.log('all cities', cities)
    console.log('all sports', sports)

    useEffect(() => {
        axios.get(`${BASE_URL}/scout/list`, {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log('result inside the chat component')
                const temp = res.data.filter((ele) => {
                    return ele.role === 'player'
                })
                console.log('temp ', temp)
                setUsers(temp)
            })
            .catch((err) => {
                console.log('error in Chat', err)
            })
    }, [])

    const handleChange = (e) => {
        // console.log('value of name in chat', e.target.value)
        setName(e.target.value)
    }

    const handleCityChange = (e) => {
        console.log(e.target.value)
        setCity(e.target.value)
    }

    const handleSportChange = (e) => {
        // console.log(e.target.value)
        setSport(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            name:name,
            members:members
        }
        axios.post(`${BASE_URL}/scout/createGroup`,data,{
            headers:{
                'Authorization': localStorage.getItem('token')
            }
        })
        .then((res) => {
            console.log('data recieved form mesage' , res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='container'>
            <h2>Create a group with friends</h2>
            <form onSubmit={handleSubmit}>
                <label>Group name: </label>
                <input
                    type='text'
                    placeholder='name of the group'
                    onChange={handleChange}
                    name='name'
                    value={name}
                /><br />
                <label>Cities</label>
                <select onChange={handleCityChange}>
                    <option> Select your city</option>
                    {
                        cities.map((city) => {
                            return <option key={city._id}> {city.city}</option>
                        })
                    }
                </select>
                <br />
                <label> Sport </label>
                <select onChange={handleSportChange}>
                    <option> Select your sport</option>
                    {
                        sports.map((sport) => {
                            return <option key={sport._id}> {sport.name}</option>
                        })
                    }
                </select><br />
                {
                    members.length > 0 && <input type='submit' />
                }

                {
                    (sport && city) ? <ChatSearch updateMembers={updateMembers} users={users.filter((ele) => {
                        return ele.sport === sport && ele.city === city
                    })} /> : <p>Please select he feilds</p>
                }
            </form>
        </div>
    )

}

export default Chat