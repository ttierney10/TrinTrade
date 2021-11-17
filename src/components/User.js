import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import db, {auth, firestore} from "../firebase.js";
import Header from "./Header/Header.js";
import _ from 'lodash';
import PopulateUser from "./PopulateUser.js";
import { page_title, title_box } from './Elements/CreateSaleElements.js';
import {footer_style} from './Elements/RegisterElements.js';
import { Button, Input } from 'antd';
const { TextArea } = Input;

function Account() {
    const [items, setItems] = useState('')
    const [user, setUser] = useState(auth.currentUser)
    const [messagePopUp, setMessagePopUp] = useState(false)
    const [body, setBody] = useState('')
    const [senderUsername, setSenderUsername] = useState('')
    let {id} = useParams()
    const [added, setAdded] = useState(false)
    const [userID, setUserID] = useState()
    const [username, setUsername] = useState('')

    function onStartMessage(){setMessagePopUp(true)}
    function onCancelMessage(){setMessagePopUp(false)}
    const onBodyChange = (e) => {setBody(e.target.value)}

    const onAddtoSavedSellers = (e) => {
        var savedSellersRef = db.collection("savedsellers")
        let sellerID = id
        let sellerUsername = username
        let payload = {userID, sellerID, sellerUsername}
        savedSellersRef.add(payload).then(payload => {
            setAdded(true)
        })
    }

    auth.onAuthStateChanged(user => {
        if(user){
            setUserID(user.uid)
            if(senderUsername === ''){
                let usersRef = db.collection("users")
                usersRef.get().then(users => {
                    users.forEach(user => {
                        let {uid} = user.data()
                        if(uid === userID){
                            setSenderUsername(user.data().username)
                        }
                    })
                })
            }
            let iid = id
            var wishlistRef = db.collection("savedsellers")
            wishlistRef.get().then(wishlist => {
                wishlist.forEach(item =>{
                    let id = item.data().sellerID
                    let user = item.data().userID
                    if(iid === id && user === userID){
                        setAdded(true)
                    }
                })
            })
        }
    })

    const onSendMessage = (e) => {
        e.preventDefault()
        var messageRef = db.collection("messages")
        var date = firestore.FieldValue.serverTimestamp()
        let recipientID = id
        let recipientUsername = username
        let senderID = userID
        let payload = {recipientID, recipientUsername, senderUsername, senderID, date, body}
        messageRef.add(payload).then((payload) => {
            setMessagePopUp(false)
            setBody('')
        })
    }

    function get(arr){
        let newArr = []
        _.map(arr, (item) => {
            if(id === item.sellerID){
                newArr.push(item)
                if(username === ''){
                    setUsername(item.username)
                }
            }
        })
        return newArr
    }

    useEffect(() => {
        let itemsRef = db.collection("items")
        itemsRef.get().then(items => {
            setItems([])
            items.forEach(item => {
                let data = item.data()
                let {id} = item

                let payload = {
                    id,
                    ...data
                }

                setItems((items) => [...items, payload])
            })
        })
    }, [setItems])

    return (
        <div className="account_container">
            <Header page="Account"/>
            <div classname="title_container" style={title_box}>
                <h5 style={page_title}>
                    {username}
                    {added
                        ?
                        <p style={{display: "inline-block", float: "right", fontSize: "medium", marginTop: "4px"}}>saved!</p>
                        :
                        <Button onClick={onAddtoSavedSellers} type="link" style={{color: "#1C47B4", display: "inline-block", float: "right"}}>Save Seller</Button>
                    }
                    <Button type="link" onClick={onStartMessage} style={{color: "#1C47B4", display: "inline-block", float: "right"}}>Contact</Button>
                </h5>
            </div>
            {messagePopUp
                ?
                <div classname="message_container" style={{height: "165px", backgroundColor: "#1C47B4", color: "white", borderColor: "#1C47B4", borderStyle: "solid", borderRadius: "5px", 
                                                        marginLeft: "calc(50% - 150px)", marginTop: "25px", width: "300px", marginBottom: "25px"}}>
                    <p style={{marginLeft: "10px", height: "10px"}}>Message to {username}</p>
                    <TextArea rows={4} value={body} onChange={onBodyChange} style={{marginLeft: "10px", width: "275px", marginBottom: "10px"}}></TextArea>
                    <Button onClick={onSendMessage} style={{cssFloat: "right", height: "25px", marginRight: "10px"}}>Send</Button>
                    <Button onClick={onCancelMessage} style={{height: "25px", marginLeft: "10px"}}>Cancel</Button>
                </div>
                :
                <p></p>
            }
            <PopulateUser items={get(items)}/>
            <div classname="register_footer" style={footer_style}/>
        </div>
    )
}

export default Account;