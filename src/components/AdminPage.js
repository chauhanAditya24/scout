import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGetUsersAdmin, startGetUsersAll } from "../actions/usersAction"
import { Chart } from 'react-google-charts'
import SportsStats from "./SportsStats"
import { Link } from 'react-router-dom'

const AdminPage = (props) => {

    const dispatch = useDispatch()
    // const [userData, setUserData] = useState([])

    useEffect(() => {
        dispatch(startGetUsersAll())
    }, [dispatch])


    const { usersAll, cities, sports } = useSelector((state) => {
        return {
            usersAll: state.users.usersAll,
            cities: state.cities.cities,
            sports: state.sports.sports
        }
    })
    const [filteredData, setFilteredData] = useState([])
    const [tableData, setTableData] = useState([])


    useEffect(() => {
        setTableData([...usersAll])
    }, [usersAll])

    // useEffect(() => {
    //     setFilteredData([...usersAll]);
    // }, [usersAll])

    // const [playerCheck, setPlayerCheck] = useState(false)
    // const [managerCheck, setManagerCheck] = useState(false)

    // const myData = usersAll.slice(0)


    // userData[0].username = 'Ayush'

    // console.log('my data' , myData)
    console.log('users all', usersAll)
    // console.log('user data',userData)

    const [city, setCity] = useState('')
    const [sport, setSport] = useState('')
    const [check, setCheck] = useState(false)
    const [search, setSearch] = useState('')

    // const tmp = usersAll.slice(0)

    // const [ tableData , setTableData] = useState(usersAll)
    // tableData[0].username = 'Ayus'
    // console.log('table data', tableData)
    // console.log('users all', usersAll)

    // pagination
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 10
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage

    const records = tableData.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(tableData.length / recordsPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1)

    // pagination end
    let playerAll = 0
    let managerAll
    if (tableData) {
        tableData.forEach((user) => {
            if (user.role === 'player') {
                playerAll++
            }
        })
        managerAll = usersAll.length - playerAll
    }

    const chartData = [
        ["Players", "Managers"],
        ['players', playerAll],
        ['managers', managerAll]
    ]

    const chartOptions = {
        chart: {
            title: 'All Players and Managers',
        },
    }

    console.log('players all', playerAll, 'managers all', managerAll)

    const handlePrev = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage !== nPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    const changeCurrentPage = (value) => {
        setCurrentPage(value)
    }

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }

    const handleSportChange = (e) => {
        setSport(e.target.value)
    }

    const handleReset = () => {
        setCity('')
        setSport('')
        setCheck(false)
    }

    const showData = () => {
        if (city.length > 1 && sport.length > 1) {
            setCheck(true)
        } else {
            setCheck(false)
            alert('please select city and sport')
        }
    }

    const handleSearch = (e) => {
        if (e.target.value.length > 1) {
            console.log('tbale data check ', tableData)
            const res = tableData.filter((ele) => {
                return ele.username.toLowerCase().includes(e.target.value) || ele.phone.toString().includes(e.target.value)
            })
            setTableData(res)
        } else {
            setTableData([...usersAll])
        }
        // if (e.target.value === '') {
        //     setTableData([...filteredData]); // Reset tableData to the previous filtered data
        // } else if (e.target.value.length > 1) {
        //     const res = filteredData.filter((user) => {
        //         return (
        //             user.username.toLowerCase().includes(e.target.value) ||
        //             user.phone.toString().includes(e.target.value)
        //         );
        //     });
        //     setTableData(res);
        // }

        //my clickbox
        // if (e.target.value === '') {
        //     console.log('blank', e.target.value)

        //     if (managerCheck === true && playerCheck === true) {
        //         setTableData(usersAll)
        //     } else if (managerCheck === true && playerCheck === false) {
        //         const res = usersAll.filter((ele) => {
        //             return ele.role === 'manager'
        //         })
        //         setTableData(res)
        //     } else if (playerCheck === true && managerCheck === false) {
        //         const res = usersAll.filter((ele) => {
        //             return ele.role === 'player'
        //         })
        //         setTableData(res)
        //     } else {
        //         setTableData(usersAll)
        //     }

        //     setTableData(tableData)
        // } else if (e.target.value.length > 1) {
        //     const res = tableData.filter((user) => {
        //         return user.username.toLowerCase().includes(e.target.value) || user.phone.toString().includes(e.target.value)
        //     })

        //     setTableData(res)
        // }
    }//end of funtion

    // const handleChangedCheck = (e) => {

    // if (e.target.name === 'player') {
    //     setPlayerCheck(e.target.checked);
    //     if (e.target.checked) {
    //         const res = filteredData.filter((ele) => ele.role === 'player');
    //         setTableData(res);
    //     } else {
    //         setTableData([...filteredData]);
    //     }
    // } else if (e.target.name === 'manager') {
    //     setManagerCheck(e.target.checked);
    //     if (e.target.checked) {
    //         const res = filteredData.filter((ele) => ele.role === 'manager');
    //         setTableData(res);
    //     } else {
    //         setTableData([...filteredData]);
    //     }
    // }   

    //     if (e.target.name === 'player') {
    //         setPlayerCheck(e.target.checked)
    //         // console.log('checked value',e.target.checked)
    //         // const tmp = tableData.slice(0)
    //         if (e.target.checked == true) {
    //             if (managerCheck === false) {
    //                 const res = tableData.filter((ele) => {
    //                     return ele.role === 'player'
    //                 })
    //                 setTableData(res)
    //             } else {
    //                 setTableData(usersAll)
    //             }

    //         } else {
    //             setTableData(usersAll)
    //         }

    //     } else if (e.target.name === 'manager') {
    //         setManagerCheck(e.target.checked)
    //         if (e.target.checked == true) {
    //             if (playerCheck === false) {
    //                 const res = tableData.filter((ele) => {
    //                     return ele.role === 'manager'
    //                 })
    //                 setTableData(res)
    //             } else {
    //                 setTableData(usersAll)
    //             }

    //         } else {
    //             setTableData(usersAll)
    //         }

    //     }

    // }

    const handleClick = (e) => {
        if (e.target.name === 'players') {
            const res = usersAll.filter((ele) => {
                return ele.role === 'player'
            })
            setTableData(res)
        } else if (e.target.name === 'managers') {
            const res = usersAll.filter((ele) => {
                return ele.role === 'manager'
            })
            setTableData(res)
        } else {
            setTableData([...usersAll])
        }
    }

    const handleID = (id) => {
        dispatch(startGetUsersAdmin(id))
        // props.history.push('/admin/view/details')
    }


    return (
        <div className="contianer">
            {
                usersAll && (
                    <div className="container">
                        <h3>Total users : {usersAll.length}</h3>

                        <input type="search" onChange={handleSearch} placeholder=" search by name or phone number " style={{ width: '280px', borderRadius: '15px' }} />

                        {/* <button style={{ marginLeft: '5px' }} className="btn btn-primary btn-sm" name="players" onClick={handleClick}> Only Players </button>
                        <button style={{ marginLeft: '5px' }} className="btn btn-primary btn-sm" name="managers" onClick={handleClick}> Only Managers </button>
                        <button style={{ marginLeft: '5px' }} className="btn btn-primary btn-sm" name="org" onClick={handleClick}> Original Table</button> */}
                        {/* <div>
                            <label> Players </label>
                            <input name='player' type="checkbox" checked={playerCheck} onChange={handleChangedCheck} />

                            <label> Managers </label>
                            <input name='manager' type="checkbox" checked={managerCheck} onChange={handleChangedCheck} />
                        </div> */}
                        <table style={{ marginTop: '25px' }} className="table table-success border-primary table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid blue', paddingLeft: '10px', backgroundColor: 'grey' }} scope="col">#</th>
                                    <th style={{ border: '1px solid blue', paddingLeft: '10px', backgroundColor: 'grey' }} scope="col">Name</th>
                                    <th style={{ border: '1px solid blue', paddingLeft: '10px', backgroundColor: 'grey' }} scope="col">Email</th>
                                    <th style={{ border: '1px solid blue', paddingLeft: '10px', backgroundColor: 'grey' }} scope="col">Phone</th>
                                    <th style={{ border: '1px solid blue', paddingLeft: '10px', backgroundColor: 'grey' }} scope="col">Role</th>
                                    <th style={{ border: '1px solid blue', paddingLeft: '10px', backgroundColor: 'grey' }} scope="col">Update User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                <td scope="col">#</td>
                                <td scope="col">Name</td>
                                <td scope="col">Email</td>
                                <td scope="col">Phone</td>
                                <td scope="col">Role</td>
                                </tr> */}
                                {
                                    records.map((user, i) => {
                                        return (
                                            <tr key={user._id}>
                                                <td>{firstIndex + i + 1}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.role}</td>
                                                <td><Link to='/admin/view/details' onClick={(e) => {
                                                    handleID(user._id)
                                                }}><button className="btn btn-success">Edit Details</button></Link> 
                                             <Link to='/home'><button className="btn btn-danger">Delete User</button></Link></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
            {
                usersAll.length > 10 && (
                    <nav style={{ marginLeft: '500px' }}>
                        <ul className='pagination'>
                            <li className='page-item'>
                                <a href='#' className='page-link' onClick={handlePrev}> Prev </a>
                            </li>
                            {
                                numbers.map((num, i) => {
                                    return (
                                        <li key={i} className={`page-item ${currentPage === num ? 'active' : ''}`}>
                                            <a className='page-link' href="#" onClick={() => {
                                                changeCurrentPage(num)
                                            }}>{num}</a>
                                        </li>
                                    )
                                })
                            }
                            <li className='page-item'>
                                <a href='#' className='page-link' onClick={handleNext}> Next </a>
                            </li>
                        </ul>
                    </nav>
                )
            }


            <div className="container">
                <div className="row">
                    <div  style={{ width: '500px', marginLeft:'70px' }} className="col">
                        <h4>Select city and sport</h4>
                        <select style={{width:'300px'}} className="form-select" value={city} onChange={handleCityChange}>
                            <option>Select the City</option>
                            {
                                cities.map((city) => {
                                    return (
                                        <option key={city._id}>{city.city}</option>
                                    )
                                })
                            }
                        </select>
                        <br />

                        <select style={{width:'300px'}} className="form-select" value={sport} onChange={handleSportChange}>
                            <option>Select your Sport</option>
                            {
                                sports.map((sport) => {
                                    return (
                                        <option key={sport._id}>{sport.name}</option>
                                    )
                                })
                            }
                        </select>
                        <button style={{marginTop:'7px'}} onClick={handleReset} className="btn btn-primary"> reset all </button>
                        <button style={{marginLeft:'7px',marginTop:'7px'}} onClick={showData} className="btn btn-success"> Show </button>
                    </div>
                    <div className="col">
                        <h4>All Players and Managers across the App</h4>
                        <Chart
                            chartType="PieChart"
                            data={chartData}
                            width={"100%"}
                            height={"400px"}
                            options={chartOptions}
                        />
                    </div>
                    {/* {
                        (
                            check && (cities.length > 1 && sports.length > 1) && (
                                <div className="col">
                                    <SportsStats usersAll={usersAll} city={city} sport={sport} />
                                </div>
                            )
                        )
                    } */}
                </div>
            </div>

            <div className="container">

                {
                    (
                        check && (cities.length > 1 && sports.length > 1) && (
                            <div className="col">
                                <SportsStats usersAll={usersAll} city={city} sport={sport} />
                            </div>
                        )
                    )
                }
                {/* <Chart
                    chartType="PieChart"
                    data={chartData}
                    width={"100%"}
                    height={"400px"}
                    options={chartOptions}
                /> */}
            </div>

        </div>
    )
}

export default AdminPage