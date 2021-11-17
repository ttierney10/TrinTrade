import React, { useState } from 'react';
import { Button } from 'antd';
import db from '../firebase.js';

function ItemSnippet(props) {
    const [popUp, setPopUp] = useState(false)
    const [isAuction, setIsAuction] = useState(props.saleType)

    const onEditSale = (e) => {
        window.location.replace(`/sale/edit-sale/${props.id}`)
    }

    function itemCondition(bool){
        if(bool){
            return "New"
        }
        else{
            return "Used"
        }
    }
    
    function removeItem(){
        db.collection("items").doc(props.id).delete()
        window.location.reload()
    }

    function cancelRemove(){
        setPopUp(false)
    }

    function PopUp(){
        setPopUp(true)
    }

    return(
        <div classname="item_container" style={{height: "225px", width: "450px", borderColor: "grey", borderStyle: "solid", marginLeft: "calc(50% - 225px)", marginBottom: "20px", borderRadius: "4px"}}>
            {!popUp
                ?
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
                            {props.quantity !== 0
                                ?
                                <div>
                                    <Button onClick={onEditSale} style={{height: "25px", width: "80px", marginTop: "20px", marginLeft: "40px", borderRadius: "5px", borderColor: "blue", color: "blue"}}>Edit</Button>
                                    <Button onClick={PopUp} style={{height: "25px", width: "80px", marginTop: "10px", marginLeft: "40px", borderRadius: "5px", borderColor: "red", color: "red"}}>Remove</Button>
                                </div>
                                :
                                <p></p>
                            }
                        </div>
                    </div>
                    <div classname="image_container">
                        <img src={props.url} alt="" style={{maxWidth: "219px", maxHeight: "219px"}}/>
                    </div>
                </div>
                :
                <div classname="popup_container">
                    <p style={{textAlign: "center", marginTop: "60px"}}>Are you sure you want to remove this item?</p>
                    <Button onClick={removeItem} style={{display: "inline-block", marginLeft: "120px", borderColor: "red", color: "red", marginTop:"10px"}}>Remove</Button>
                    <Button onClick={cancelRemove} style={{display: "inline-block", marginLeft: "30px", borderColor: "blue", color: "blue"}}>Cancel</Button>
                </div>
            }
        </div>
    )
}

export default ItemSnippet;