
export const getSender = (loggedUser, users, allUsers) => {


    // let check 

    // if(loggedUser._id !== users[0]._id){
    //     check = users[1]._id
    // }else{
    //     check = users[0]._id
    // }

    // console.log('check variable' , loggedUser._id === users[0])

    // console.log('loggedUSer'  , loggedUser)
    // console.log('USER'  , users)
    // console.log('ALL USERS new one'  , allUsers)

    // console.log('users checking', typeof users[0])

    // console.log(typeof allUsers[0]._id)

    if(users && users.length === 2){

    const arr = users[0] === loggedUser._id ? (
        allUsers.filter((ele) => {
            return ele._id === users[1]
        })
    ) : (
        allUsers.filter((ele) => {
            return ele._id === users[0]
        })
    )

    if(arr && arr.length >0){
        console.log('arrrrr ', arr[0].username)
        return arr[0].username

    }
    console.error('unable to determine sender')
    return ''
    }
}


export const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 && (
            messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined
        ) &&
        messages[i].sender._id !== userId
    )
}


export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages.length - 1 && 
        messages[messages.length-1].sender._id !== userId && 
        messages[messages.length-1 ].sender._id
    )
}


export const isSameSenderMargin = (messages,m,i,userId) => {
    if(
        i<messages.length-1 && 
        messages[i+1].sender._id === m.sender._id && 
        messages[i].sender._id !== userId
    ){
        return 33
    }else if(
        (
        i<messages.length-1 && messages[i+1].sender._id !== m.sender._id && 
        messages[i].sender._id !==userId) || (
            i === messages.length-1 && messages[i].sender._id !== userId
        )
    ){
        return 0
    }else{
        return 'auto'
    } 
}

export const isSameUser = (messages,m,i) => {
    return i>0 && messages[i-1].sender._id === m.sender._id
}