import React, { useEffect, useState } from 'react';
import Header from "./Header/Header.js";
import db, { auth } from '../firebase.js';
import {footer_style} from './Elements/RegisterElements.js';
import PopulateMessages from './PopulateMessages.js';
import _ from 'lodash';

function Messages() {
    const [user, setUser] = useState(auth.currentUser)
    const [userID, setUserID] = useState('')
    const [messages, setMessages] = useState([])

    auth.onAuthStateChanged(user => {
        if(user){setUser(user)}
    })

    useEffect(() => {
        if(user){
            setUserID(user.uid)
            let messagesRef = db.collection("messages").orderBy('date', 'desc')
            messagesRef.get().then(messages => {
                setMessages([])
                messages.forEach(message => {
                    let data = message.data()
                    let {id} = message

                    let payload = {
                        id,
                        ...data
                    }

                    setMessages((messages) => [...messages, payload])
                })
            })
        }
    }, [user])

    return (
        <div className="messages_page_container">
            <Header page="Messaging"/>                
            <div classname="messages_body_container">
                <PopulateMessages chats={messages} userID={userID} />
            </div>
            <div classname="register_footer" style={footer_style}/>
        </div>
    )
}

export default Messages;