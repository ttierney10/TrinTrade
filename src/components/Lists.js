import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import db, { auth } from '../firebase.js';
import { page_title, title_box } from './Elements/CreateSaleElements.js';
import Header from "./Header/Header.js";
import {footer_style} from './Elements/RegisterElements.js';
import PopulateWishlist from './PopulateWishlist.js';
import PopulateSavedSellers from './PopulateSavedSellers.js';

function Lists() {
    const [user, setUser] = useState(auth.currentUser)
    const [userID, setUserID] = useState('')
    const [wishlist, setWishlist] = useState([])
    const [items, setItems] = useState([])
    const [list, setList] = useState("Wishlist")
    const [listID, setListID]= useState([])
    const [sellersList, setSellersList] = useState([])

    function onWishlist(){setList("Wishlist")}
    function onSavedSellers(){setList("SavedSellers")}
    function onBids(){setList("Bids")}

    auth.onAuthStateChanged(user => {
        if(user){
            setUser(user)
            setUserID(user.uid)
        }
    })

    useEffect(() => {
        if(user){
            var wishlistRef = db.collection("wishlist")
            wishlistRef.get().then(wishlist => {
                setWishlist([])
                setListID([])
                wishlist.forEach(item =>{
                    let data = item.data().itemID
                    let {id} = item

                    let payload = {
                        data
                    }
                    if(user.uid === item.data().userID){
                        setWishlist((wishlist) => [...wishlist, payload])
                        setListID((listID) => [...listID, id])
                    }
                })
            })
            var savedSellersRef = db.collection("savedsellers")
            savedSellersRef.get().then(sellerslist => {
                setSellersList([])
                sellerslist.forEach(seller => {
                    if(userID === seller.data().userID){
                        setSellersList((sellersList) => [...sellersList, seller])
                    }
                })
            })
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
        }
    })
    return (
        <div className="lists_container">
            <Header page="Lists"/>
            <div classname="button_container">
                <Button onClick={onWishlist} style={{width: "125px"}}>Wishlist</Button>
                <Button onClick={onSavedSellers} style={{width: "125px"}}>Saved Sellers</Button>
                <Button onClick={onBids} style={{width: "80px"}}>Bids</Button>
            </div>
            <div classname="title_container" style={title_box}>
                <h5 style={page_title}>
                    {list}
                </h5>
            </div>
            <div classname="list_container" style={{paddingBottom: "100px"}}>
                {list === "Wishlist"
                    ?
                    <PopulateWishlist wishlist={wishlist} items={items} list={list} userID={userID} listID={listID}/>
                    :
                    <p></p>
                }
                {list === "SavedSellers"
                    ?
                    <PopulateSavedSellers sellersList={sellersList} list={list} />
                    :
                    <p></p>
                }
                {list === "Bids"
                    ?
                    <div>
                        </div>
                    :
                    <p></p>
                }
            </div>
            <div classname="register_footer" style={footer_style}/>
        </div>
    )
}

export default Lists;