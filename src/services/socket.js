// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { BASE_URL } from "./helper";

// const socket = io(`${BASE_URL}`)

// const useSocketListener = (event, callback) => {
//     useEffect(() => {
//         if (event && callback) {
//             socket.on(event, callback)

//             return () => {
//                 socket.off(event, callback)
//             }
//         }
//     }, [event, callback])
// }

// const useSocketEmitter = (event, data) => {
//     useEffect(() => {
//         if (event, data) {
//             socket.emit(event,data)
//         }
//     },[event,data])
// }

// export {useSocketListener, useSocketEmitter}

import { io } from 'socket.io-client'
import { BASE_URL } from './helper'

const URL = BASE_URL
export const socket = io(URL)