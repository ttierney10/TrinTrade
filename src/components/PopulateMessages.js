import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { getChats, getMessages, callFirebase } from './Elements/Chats';
import { Button, Input } from 'antd';
import db, { firestore } from '../firebase';
const { TextArea } = Input;

function PopulateChatList(props) {
    const [recipientUsername, setRecipientUsername] = useState('')
    const [senderID, setSenderID] = useState('')
    const [recipientID, setRecipientID] = useState('')
    const [senderUsername, setSenderUsername] = useState('')
    const [messageBody, setMessageBody] = useState('')
    const [messages, setMessages] = useState(props.chats)
    const [bool, setBool] = useState(true)

    const onChangeMessage = (event) => setMessageBody(event.target.value)

    const onSendMessage = (e) => {
        e.preventDefault()
        if(recipientUsername !== '' && messageBody !== ''){
            var messageRef = db.collection("messages")
            var date = firestore.FieldValue.serverTimestamp()
            let body = messageBody
            let payload = {recipientID, recipientUsername, senderUsername, senderID, date, body}
            messageRef.add(payload).then((payload) => {
                setMessageBody('')
                window.location.reload()
                setMessages([])
            })
        }
    }

    function onClickChat(recipientUsername, senderUsername, recipientID, senderID, e){
        setSenderUsername(senderUsername)
        setRecipientUsername(recipientUsername)
        setSenderID(senderID)
        setRecipientID(recipientID)
    }

    useEffect(() => {
        setMessages(props.chats)
    })

    return (
        <div classname="populate_message_page_container" style={{width: "80%", marginTop: "50px", marginLeft: "5%", width: "90%"}}>
            <div className="populate_chats_container" style={{overflowY: "scroll", backgroundColor: "#D4D4D4", borderStyle: "solid", borderRadius: "5px", borderColor: "black", width: "175px", height: "400px", display: "inline-block"}}>
                {
                    _.map(getChats(messages, props.userID), (chat) => {
                        let recipientUsername = ''
                        let senderUsername = ''
                        let recipientID = ''
                        let senderID = ''
                        if(props.userID === chat.recipientID){
                            recipientUsername = chat.senderUsername
                            senderUsername = chat.recipientUsername
                            recipientID = chat.senderID
                            senderID = chat.recipientID
                        }
                        else{
                            recipientUsername = chat.recipientUsername
                            senderUsername = chat.senderUsername
                            recipientID = chat.recipientID
                            senderID = chat.senderID
                        }
                        if(bool){
                            onClickChat(recipientUsername, senderUsername, recipientID, senderID)
                            setBool(false)
                        }
                        let dots = false
                        let date = chat.date
                        let d = date.toDate()
                        let dd = d.getDate()
                        let mm = d.getMonth() + 1
                        let yy = d.getFullYear() - 2000
                        let preview = chat.body                        
                        if(preview.length > 20){
                            preview = preview.slice(0, 20)
                            dots = true
                        }
                        return(
                            <div onClick={(e) => onClickChat(recipientUsername, senderUsername, recipientID, senderID, e)} classname="chat_container" style={{color: "#1C47B4", borderStyle: "none none solid none", borderColor: "black"}}>
                                <p style={{fontWeight: "bold", display: "inline-block", height: "0px", width: "75%"}}>{recipientUsername}</p>
                                <h style={{fontSize: "x-small", display: "inline-block", height: "0px", cssFloat: "right"}}>{mm}/{dd}/{yy}</h>
                                {dots
                                    ?
                                    <g><br/>{preview}...</g>
                                    :
                                    <g><br/>{preview}</g>
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div classname="populate_messages_container" style={{backgroundColor: "#D4D4D4", display: "inline-block", verticalAlign: "top", borderStyle: "solid", borderRadius: "5px", borderColor: "black", width: "calc(100% - 175px)", height: "400px"}}>
                <p style={{height: "45px", textAlign: "center", paddingTop: "10px", fontWeight: "bold", borderStyle: "none none solid none", borderColor: "black", color: "#1C47B4"}}>{recipientUsername}</p>
                <div classname="messages_container" style={{height: "282px", overflowY: "scroll"}}>
                    {
                        _.map(getMessages(messages, recipientID, senderID), (message) => {
                            if(props.userID === message.senderID){
                                return(
                                    <div classname="message_container">
                                        <p style={{borderStyle: "solid", borderRadius: "5px", width: "50%", marginLeft: "50%", borderWidth: "thin", backgroundColor: "#1C47B4", color: "white", borderColor: "#1C47B4"}}>{message.body}</p>
                                    </div>
                                )
                            }
                            else{
                                return(
                                    <div classname="message_container">
                                        <p style={{backgroundColor: "grey", color: "black", borderColor: "grey", borderStyle: "solid", borderRadius: "5px", width: "50%"}}>{message.body}</p>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <TextArea rows={2} placeholder="Message" value={messageBody} onChange={onChangeMessage} style={{borderRadius: "0px", borderWidth: "medium", display: "inline-block", borderColor: "black", borderStyle: "solid solid solid none", width: "calc(100% - 75px"}}></TextArea>
                <Button onClick={onSendMessage} style={{borderRadius: "0px", borderWidth: "medium", borderColor: "#1C47B4", height: "53px", verticalAlign: "top", backgroundColor: "#1C47B4", color: "white", width: "75px", display: "inline-block"}}>Send</Button>
            </div>
        </div>
    )
}

export default PopulateChatList;