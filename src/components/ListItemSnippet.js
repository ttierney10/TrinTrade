import React, { useState } from 'react';
import { Button } from 'antd';
import db from '../firebase.js';

function ListItemSnippet(props) {
    const [isAuction, setIsAuction] = useState(props.saleType)
    const [listID, setListID] = useState(props.itemlistID)

    function itemCondition(bool){
        if(bool){
            return "New"
        }
        else{
            return "Used"
        }
    }
    
    function removeItem(e){
        db.collection("wishlist").doc(listID).delete().then(item =>{
            window.location.reload()
        })
    }

    return(
        <div classname="item_container" style={{height: "225px", width: "450px", borderColor: "grey", borderStyle: "solid", marginLeft: "calc(50% - 225px)", marginBottom: "20px", borderRadius: "4px"}}>
            <div>
                <div classname="info_container" style={{cssFloat: "right", width: "219px"}}>
                    <p style={{fontSize: "large", textDecoration: "underline", fontWeight: "bold", height: "5px", marginTop: "10px"}}>{props.name}</p>
                    <div classname="indent_container" style={{marginLeft: "20px"}}>
                        <p style={{height: "0"}}>Condition: {itemCondition(props.condition)}</p>
                        <p style={{height: "0"}}>Quantity: {props.quantity}</p>
                        <p style={{color: "red", textDecoration: "underline", fontSize: "small", marginLeft: "65px", height: "0"}}>{props.sold} sold</p>
                        <p style={{height: "0"}}>Color: {props.color}</p>
                        {!isAuction
                            ?
                            <p style={{height: "0"}}>Price: {props.price}$</p>
                            :
                            <p style={{height: "0"}}>Highest Bid: {props.price}$</p>
                        }
                        <p style={{height: "0"}}>Location: {props.location}</p>
                        <Button style={{height: "25px", width: "100px", marginTop: "20px", marginLeft: "10px", borderRadius: "5px", borderColor: "#1C47B4", color: "#1C47B4"}}>More info</Button>
                        <Button onClick={removeItem} style={{height: "25px", width: "100px", marginTop: "10px", marginLeft: "10px", borderRadius: "5px", borderColor: "red", color: "red"}}>Remove</Button>
                    </div>
                </div>
                <div classname="image_container">
                    <img src={props.url} alt="" style={{maxWidth: "219px", maxHeight: "219px"}}/>
                </div>
            </div>
        </div>
    )
}

export default ListItemSnippet;