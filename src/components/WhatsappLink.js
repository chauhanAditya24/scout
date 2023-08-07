import React from 'react'

const WhatsappLink = (props) => {
    
    const link = 'https://wa.me/919760852627'

    return (
        <div>
            <a href={link} target='_blank'> <button> Chat WhatsApp </button></a>
        </div>
    )
}

export default WhatsappLink