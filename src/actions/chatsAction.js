import axios from "axios";
import { BASE_URL } from "../services/helper";

export const notificationUpdate = (arr) => {
    // console.log('payload in noti', arr)
    return {
        type:'UPDATE_NOTIFICATION',
        payload:arr
    }
}

export const selectedChat = (chats) => {
    // console.log("ACTION :",chats)
    return {
        type:'SELECTED_CHAT',
        payload: chats
    }
}

export const allChats = (chats) => {
    return {
        type:'ALL_CHATS',
        payload:chats
    }
}

export const startGetAllChats = () => {
    return (dispatch) => {
        axios.get(`${BASE_URL}/scout/chats/all`,{
            headers:{
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                dispatch(allChats(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}