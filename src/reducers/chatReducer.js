const initialState = {
    allChats: [],
    selectedChat: {},
    notification: []
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ALL_CHATS': {
            return { ...state, allChats: action.payload }
        }

        case 'SELECTED_CHAT': {
            return { ...state, selectedChat: action.payload }
        }

        case 'UPDATE_NOTIFICATION': {
            return {...state, notification: action.payload}
        }

        default: {
            return { ...state }
        }
    }
}

export default chatReducer