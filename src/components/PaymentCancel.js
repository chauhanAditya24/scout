import React, { useEffect } from 'react'
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
import { Container } from '@chakra-ui/react';
const { Paragraph, Text } = Typography;

const PaymentCancel = (props) => {

    useEffect(() => {
        localStorage.removeItem('booking')
        setTimeout(() => {
            props.history.push('/home')
        }, 7000)
    }, [props.history])

    return (
        <Container 
            marginTop='100px'
            borderRadius='20px'
            backgroundColor="#F5EEE6"
        >
            <Result
                status="error"
                title="Payment Failed"
                subTitle="If your money is debited it will be refunded to you by 2-3 working days."
            // extra={[
            //     <Button type="primary" key="console">
            //         Go Console
            //     </Button>,
            //     <Button key="buy">Buy Again</Button>,
            // ]}
            >
            </Result>
        </Container>
    )
}

export default PaymentCancel