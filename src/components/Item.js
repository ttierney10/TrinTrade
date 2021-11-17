import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Header from "./Header/Header.js";
import db, {auth, firestore} from "../firebase.js";
import { Button, Input, InputNumber } from 'antd';
import { footer_style } from './Elements/RegisterElements.js';
import _ from 'lodash';
const { TextArea } = Input;

function Item() {
    const [items, setItems] = useState('false')
    let {id} = useParams()
    const [isAuction, setIsAuction] = useState(items.saleType)
    const [messagePopUp, setMessagePopUp] = useState(false)
    const [user, setUser] = useState(auth.currentUser)
    const [body, setBody] = useState('')
    const [bidderUsername, setBidderUsername] = useState('')
    const [username, setUsername] = useState('')
    const [userID, setUserID] = useState()
    const [added, setAdded] = useState(false)
    const [bidding, setBidding] = useState(false)
    const [minBid, setMinBid] = useState(items.price +1)
    const [bid, setBid] = useState(minBid)
    const [currentBid, setCurrentBid] = useState(items.price)

    auth.onAuthStateChanged(user => {
        if(user){
            setUser(user)
            setUserID(user.uid)
            let usersRef = db.collection("users")
            usersRef.get().then(users => {
                users.forEach(user => {
                    let uid = user.data().uid
                    if(uid === userID){
                        setBidderUsername(user.data().username)
                    }
                })
            })
        }
    })
    
    function onStartMessage(){setMessagePopUp(true)}
    function onCancelMessage(){setMessagePopUp(false)}
    const onBodyChange = (e) => {setBody(e.target.value)}
    function onBidChange(value){setBid(value)}
    function makeBid(){setBidding(true)}
    function cancelBid(){setBidding(false)}
    function submitBid(){
        let bidRef = db.collection("bids")
        let bidderID = userID
        let payload = {bidderID, bidderUsername, items, bid}
        if(bid > items.price){bidRef.add(payload).then(payload =>{window.location.reload()})}
    }

    const onAddtoWishlist = (e) => {
        var wishlistRef = db.collection("wishlist")
        let itemID = items.id
        let payload = {userID, itemID}
        wishlistRef.add(payload).then(payload => {
            setAdded(true)
        })
    }

    const onSendMessage = (e) => {
        e.preventDefault()
        let senderUsername = username
        var messageRef = db.collection("messages")
        var date = firestore.FieldValue.serverTimestamp()
        let recipientID = items.sellerID
        let recipientUsername = items.username
        let senderID = user.uid
        let payload = {recipientID, recipientUsername, senderUsername, senderID, date, body}
        messageRef.add(payload).then((payload) => {
            setMessagePopUp(false)
            setBody('')
        })
    }

    function itemCondition(bool){
        if(bool){
            return "New"
        }
        else{
            return "Used"
        }
    }

    useEffect(() => {
        let itemsRef = db.collection("items").doc(id)
        itemsRef.get().then((item) => {
            let data = item.data()
            let {id} = item

            let payload = {
                id,
                ...data
            }
            setItems(payload)
            setIsAuction(item.data().saleType)
            console.log(id)
            let bidRef = db.collection("bids")
            bidRef.get().then(bids => {
                let max = 0
                bids.forEach(bid => {
                    if(bid.data().items.id === id && bid.data().bid > max){
                        max = bid.data().bid
                    }
                })
                setCurrentBid(max)
            })
        })
        if(user && username === '' && userID !== ''){
            let usersRef = db.collection("users")
            usersRef.get().then(users => {
                users.forEach(user => {
                    let {uid} = user.data()
                    if(uid === userID){
                        setUsername(user.data().username)
                        let iid = id
                        var wishlistRef = db.collection("wishlist")
                        wishlistRef.get().then(wishlist => {
                            wishlist.forEach(item =>{
                                let id = item.data().itemID
                                let user = item.data().userID
                                if(iid === id && user === userID){
                                    setAdded(true)
                                }
                            })
                        })
                    }
                })
            })
        }        
    }, [userID])

    return (
        <div className="Item_page_container">
            <Header page="Home"/>
            <Button type="link" href="/home" style={{color: "#1C47B4"}}>Back to Home</Button>
            <div classname="item_container" style={{width: "80%", marginLeft: "10%", marginTop: "50px"}}>
                <div style={{width: "40%", cssFloat: "right"}}>    
                    <img src={items.url} alt="" style={{width: "100%", cssFloat: "right"}}/>
                </div>
                <div classname="info_container" style={{width: "50%"}}>
                    <p style={{fontSize: "large", textDecoration: "underline", fontWeight: "bold", height: "5px", marginTop: "0", display: "inline-block"}}>{items.name}</p>
                    <p style={{display: "inline-block", marginLeft: "10px", height: "5px", marginRight: "5px"}}>by: </p>
                    <a href={`/user/${items.sellerID}`} style={{display: "inline-block", color: "#1C47B4"}}>
                        <p>{items.username}</p>
                    </a>
                    <div classname="indent_container" style={{marginLeft: "20px", marginBottom: "30px"}}>
                        <p style={{height: "0", width: "100%"}}>Condition: {itemCondition(items.condition)}</p>
                        <p style={{height: "0"}}>Quantity: {items.quantity}</p>
                        <p style={{color: "red", textDecoration: "underline", fontSize: "small", marginLeft: "65px", height: "0"}}>{items.sold} sold</p>
                        <p style={{height: "0"}}>Color: {items.color}</p>
                        {!isAuction
                            ?
                            <p style={{height: "0"}}>Price: {items.price}$</p>
                            :
                            <p style={{height: "0"}}>Current Bid: {currentBid}$</p>
                        }
                        <p style={{height: "5px"}}>Location: {items.location}</p>
                        <p style={{lineHeight: "15px", width: "100%"}}>Description: {items.description}</p>
                    </div>
                </div>
                {!messagePopUp && !bidding
                    ?
                    <div>
                        {isAuction 
                            ?
                            <Button onClick={makeBid} style={{backgroundColor: "#1C47B4", marginLeft: "15px", color: "white"}}>Bid</Button>
                            :
                            <p></p>
                        }
                        <Button type="link" onClick={onStartMessage} style={{color: "#1C47B4"}}>Message {items.username}</Button>
                        {added
                            ?
                            <p style={{display: "inline-block"}}>added!</p>
                            :
                            <Button type="link" onClick={onAddtoWishlist} style={{color: "#1C47B4"}}>Add to wishlist</Button>
                        }
                    </div>
                    :
                    <p></p>
                }
            </div>
            <div classname="message_boolean_container" style={{paddingBottom: "200px"}}>
                {bidding
                    ?
                    <div style={{marginLeft: "10%"}}>
                        Bid:
                        <InputNumber value={bid} onChange={onBidChange} min={items.price +1} style={{marginLeft: "10px"}}></InputNumber>
                        <Button onClick={submitBid} style={{width: "100px", backgroundColor: "#1C47B4", marginLeft: "15px", color: "white"}}>Submit Bid</Button>
                        <Button onClick={cancelBid} style={{float: "right", marginRight: "15px"}}>Cancel</Button>
                    </div>
                    :
                    <p></p>
                }
                {messagePopUp
                    ?
                    <div classname="message_container" style={{height: "165px", backgroundColor: "#1C47B4", color: "white", borderColor: "#1C47B4", borderStyle: "solid", borderRadius: "5px", 
                                                            marginLeft: "5%", marginRight: "calc(95% - 250px)", marginTop: "100px"}}>
                        <p style={{marginLeft: "10px", height: "10px"}}>Message to {items.username}</p>
                        <TextArea rows={4} value={body} onChange={onBodyChange} style={{marginLeft: "10px", width: "225px", marginBottom: "10px"}}></TextArea>
                        <Button onClick={onSendMessage} style={{cssFloat: "right", height: "25px", marginRight: "10px"}}>Send</Button>
                        <Button onClick={onCancelMessage} style={{height: "25px", marginLeft: "10px"}}>Cancel</Button>
                    </div>
                    :
                    <p style={{height: "300px"}}></p>
                }
            </div>
            <div classname="register_footer" style={footer_style}/>
        </div>
    )
}
export default Item;