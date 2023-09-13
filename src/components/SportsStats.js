import React from 'react'
import { Chart } from 'react-google-charts'

const SportsStats = (props) => {
    const { usersAll, city, sport } = props

    // for city + sport
    const userSpec = usersAll.filter((user) => {
        return user.city === city && user.sport === sport
    })
    // for city
    const userCity = usersAll.filter((user) => {
        return user.city === city
    })
    // city player
    const playerCity = userCity.filter((user) => {
        return user.role === 'player'
    })
    // city manager
    const managerCity = userCity.length - playerCity.length

    // for sport
    const userSport = usersAll.filter((user) => {
        return user.sport === sport
    })

    const playerSport = userSport.filter((user) => {
        return user.role === 'player'
    })

    const managerSport = userSport.length - playerSport.length

    console.log('user spec', userSpec)

    const playerAll = userSpec.filter((user) => {
        return user.role === 'player'
    })
    console.log('player all', playerAll)

    const managerAll = userSpec.length - playerAll.length
    console.log('manager all', managerAll)


    const chartData = [
        ['Players', 'Managers'],
        ['players', playerAll.length],
        ['managers', managerAll]
    ]

    const chartDataCity = [
        ['players', 'managers'],
        ['players', playerCity.length],
        ['manager', managerCity]
    ]

    const chartSportData = [
        ['players', 'managers'],
        ['players', playerSport.length],
        ['manager', managerSport]
    ]

    const chartOption = {
        chart: {
            title: `All players and Managers in ${city} for ${sport}`
        },
    }

    return (
        <>
            {
                userSpec.length > 0 ? (
                    (city.length > 1 && sport.length > 1) && (
                        <>
                            <div className="col">
                                <h4>All players and Managers in {city} for {sport}</h4>
                                <Chart
                                    chartType='PieChart'
                                    data={chartData}
                                    options={chartOption}
                                    width={'100%'}
                                    height={'400px'}
                                />
                            </div>
                            <div className='continer'>
                                <div className='row'>
                                    <div className='col'>
                                        <h4>All players and Managers in {city}</h4>
                                        <Chart
                                            chartType='PieChart'
                                            data={chartDataCity}
                                            width={'100%'}
                                            height={'400px'}
                                        />
                                    </div>
                                    <div className='col'>
                                        <h4> All players and managers for {sport}</h4>
                                        <Chart 
                                            chartType='PieChart'
                                            data={chartSportData}
                                            width={'100%'}
                                            height={'400px'}
                                        />
                                    </div>
                                </div>

                            </div>
                        </>
                    )
                ) : (
                    <div>
                        <h4> No data present for the user </h4>
                    </div>
                )
            }
        </>
    )
}

export default SportsStats