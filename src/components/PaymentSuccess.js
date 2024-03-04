import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/helper'
import { useSelector } from 'react-redux'
import { Container, useToast } from '@chakra-ui/react'
import { Button, Result } from 'antd';

const PaymentSuccess = (props) => {
    const [bookingData, setBookingData] = useState({})
    let check = false

    const toast = useToast()


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('booking'))
        console.log('data getting from local stroage', data)
        setBookingData(data)

        axios.post(`${BASE_URL}/scout/ground/book`, data, {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data)
                console.log('successfully booked the venue')
                if (res.data.msg === 'not available') {
                    // setBookingNotAvailable(true)
                    toast({
                        title: 'Already Booked',
                        status: 'warning',
                        duration: 5000,
                        isClosable: true,
                        position: 'top'
                    })
                } else {
                    toast({
                        title: 'Booked Successfully',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                        position: 'top'
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])


    // console.log('booking data in  --------->',bookingData)

    // if(Object.keys(bookingData).length > 0){
    //     if(!check){
    //         console.log('requrest 1010')
    //         check = true
    //     }
    // }

    // useEffect(() => {
    //     axios.get(`${BASE_URL}/scout/mail`,{
    //         headers:{
    //             'authorization':localStorage.getItem('token')
    //         }
    //     })
    //     .then((res) => {
    //         console.log(' ****************** MAIL *****************')
    //         console.log(res)

    //         setTimeout(() => {
    //             props.history.push('/home')
    //         },4000)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }, [props.history])

    // const { tempData } = useSelector((state) => {
    //     return state.bookings.tempData
    // })

    // console.log("booking data success fully fecthed here ----->>>>",tempData)

    return (
        <Container
            backgroundColor='#D2E3C8'
            borderRadius='20px'
            marginTop='100px'
        >
            <Result
                status="success"
                title="Your turf have been successfully booked."
                subTitle="Your booking details will be sent to your registered email id or you can see it on your booking's section."
            // extra={[
            //     <Button type="primary" key="console">
            //         Go Console
            //     </Button>,
            //     <Button key="buy">Buy Again</Button>,
            // ]}
            />
        </Container>
    )
}

export default PaymentSuccess