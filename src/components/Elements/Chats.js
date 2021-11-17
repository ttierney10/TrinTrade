import _ from 'lodash';

export function getChats(arr, userID){
    if(arr.length === 0){return -1}
    let newArr = []
    let chats = []
    newArr = filterUser(arr, userID)
    chats = filterChats(newArr, userID)
    newArr = filterLatestMessage(newArr, chats)
/*
    let hello = [{A: "hello", B: 12}, {A: "tomato", B: 43}]
    _.map(hello, (item) => {
        console.log(item.A)
    })
*/
    return newArr
}

function filterChats(arr, userID){
    let newArr = []
    _.map(arr, (message) => {
        if(!newArr.includes(message.senderID) && userID !== message.senderID){
            newArr.push(message.senderID)
        }
        if(!newArr.includes(message.recipientID) && userID !== message.recipientID){
            newArr.push(message.recipientID)
        }
    })
    return newArr
}

function filterUser(arr, userID){
    let newArr = []
    _.map(arr, (message) => {
        if(message.senderID === userID || message.recipientID === userID){
            newArr.push(message)
        }
    })
    return newArr
}

function filterLatestMessage(arr, chats){
    let newArr = []
    for(let i = 0; i < chats.length; i++){
        let max = 0
        let mostRecent = []
        _.map(arr, (message) => {
            if(message.senderID === chats[i] || message.recipientID === chats[i]){
                if(message.date > max){
                    max = message.date
                    mostRecent = message
                }
            }
        })
        newArr.push(mostRecent)
    }
    return newArr
}

export function getMessages(arr, contactID, userID){
    if(arr.length === 0){return -1}
    let newArr = []
    newArr = filterUser(arr, userID)
    newArr = filterUser(newArr, contactID)
    return newArr
}