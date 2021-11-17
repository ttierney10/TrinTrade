import React, { useEffect, useState } from 'react';
import {footer_style} from './Elements/RegisterElements.js';
import Header from "./Header/Header.js";
import { Button } from 'antd';
import _ from 'lodash';
import db, {auth} from "../firebase.js";
import PopulateSell from "./PopulateSell.js";
import {title_box, page_title} from "./Elements/CreateSaleElements.js";

function Sell(props) {
    const [items, setItems] = useState([])
    const [user, setUser] = useState(auth.currentUser)

    auth.onAuthStateChanged(user => {
        if(user){setUser(user)}
    })

    function get(arr){
        let newArr = []
        _.map(arr, (item) => {
            if(user.uid === item.sellerID){
                newArr.push(item)
            }
        })
        return newArr
    }

    useEffect(() => {
        if(user){
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
    }, [setItems, user])

    return (
        <div className="sell_container">
            <Header page="Selling"/>
            <div classname="title_container" style={title_box}>
                <h5 style={page_title}>
                    My Items
                </h5>
            </div>
            <div className="create_sale_container">
                <Button href="/sell/new-sale" style={{marginLeft: "calc(50% - 225px)", marginBottom: "10px", color: "white", backgroundColor: "#ECAB2E"}}>New Sale</Button>
            </div>
            <div classname="sales_container" style={{paddingBottom: "100px"}}>
                <PopulateSell items={get(items)}/>
            </div>
            <div classname="register_footer" style={footer_style}/>
        </div>
    )
}
export default Sell;