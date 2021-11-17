import React, { useEffect, useState } from 'react';
import Header from "./Header/Header.js";
import { Input, Button, Checkbox, InputNumber } from 'antd';
import {title_box, page_title, input_style, input_container, button_style, tag_style, png_style,
        checkbox_style, footer_style} from './Elements/CreateSaleElements.js';
import db, {storage, auth} from "../firebase.js";
import tag from './Elements/TagInput.png';
import './Elements/CreateSale.css';
import {v4 as uuidv4} from 'uuid';
const { TextArea } = Input;

function CreateSale(props) {

    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const [quantity, setQuantity] = useState('')
    const [description, setDescription] = useState('')
    const [tag1, setTag1] = useState('')
    const [tag2, setTag2] = useState('')
    const [tag3, setTag3] = useState('')
    const [condition, setCondition] = useState(true)
    const [preview, setPreview] = useState('')
    const [location, setLocation] = useState('')
    const [price, setPrice] = useState('')
    const [saleType, setSaleType] = useState(false)
    const [file, setFile] = useState(null);
    const [tagError, setTagError] = useState(false);
    const [userID, setUserID] = useState("")
    const [username, setUsername] = useState("")

    const onNameChange = (event) => setName(event.target.value)
    const onColorChange = (event) => setColor(event.target.value)
    function onQuantityChange(value) {setQuantity(value)}
    const onDescriptionChange = (event) => setDescription(event.target.value)
    const onTag1Change = (event) => setTag1(event.target.value)
    const onTag2Change = (event) => setTag2(event.target.value)
    const onTag3Change = (event) => setTag3(event.target.value)
    const onNewChange = (event) => setCondition(true)
    const onUsedChange = (event) => setCondition(false)
    const onLocationChange = (event) => setLocation(event.target.value)
    const onSaleTypeChange = (event) => setSaleType(true)
    function onPriceChange(value) {setPrice(value)}

    auth.onAuthStateChanged(user => {
        if(user){setUserID(user.uid)}
    })

    function handleChange(e) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(() => {
        let currUser = auth.currentUser
        if(currUser){setUserID(currUser.uid)}
        let usersRef = db.collection("users")
        usersRef.get().then(users => {
            users.forEach(user => {
                let uid = user.data().uid
                if(uid === userID){
                    setUsername(user.data().username)
                }
            })
        })
    }, [setUserID, userID])
/*
    var enable = showButton()

    function showButton() {
        if(!isNaN(price) && price && name && quantity && location && ){
            if(tag1 || tag2 || tag3){

            }
            else{
                setTagError(true)
            }
        }
    }
*/
    const onCreateSale = (e) => {
        //add condition for price being a number with isNaN(value) and conditions for all input filled out
        e.preventDefault();
        let sellerID = userID
        let imageName = uuidv4()
        const uploadTask = storage.ref(`/images/${imageName}`).put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
            storage
                .ref("images")
                .child(imageName)
                .getDownloadURL()
                .then((url) => {
                    setFile(null);
                    let itemRef = db.collection('items')
                    let sold = 0
                    let payload = {name, color, quantity, url, description, tag1, tag2, tag3, location, price, saleType, condition, sellerID, username, sold}
                    itemRef.add(payload).then((postRef) => {window.location.replace("/sell")})
                });
        });
    }

    return (
        <div className="createsale_container">
            <Header page="Selling"/>
            <div classname="title_container" style={title_box}>
                <h5 style={page_title}>
                    New Sale
                </h5>
            </div>
            <div classname="item_inputs_container">
                <div classname="item_input_container" style={{display: "inline-block"}}>
                    <div classname="name_input" style={{marginLeft: "24px", width: "40vw", marginTop: "20px"}}>
                        <Input placeholder="Item Name" value={name} onChange={onNameChange} />
                    </div>
                </div>
                <div classname="upload_container" style={{cssFloat: "right", width: "40%", marginLeft: "5%", marginTop: "20px"}}>
                    <input type="file" id="fileItem" onChange={handleChange} style={{width: "100%"}}/>
                    {preview
                        ?
                        <img src={preview} alt="" style={{width: "90%", marginTop: "10px", borderStyle: "inset", borderColor: "#ECAB2E", maxWidth: "250px"}}/>
                        :
                        <div></div>
                    }
                </div>
                <div classname="condition_container" style={{marginBottom: "10px"}}>
                    <div classname="new_container" style={checkbox_style}>
                        <Checkbox checked={condition} onChange={onNewChange}>New</Checkbox>
                    </div>
                    <div classname="used_container" style={checkbox_style}>
                        <Checkbox checked={!condition} onChange={onUsedChange}>Used</Checkbox>
                    </div>
                </div>
                <div classname="item_input_container" style={input_style}>
                    <div classname="price_input">
                        <InputNumber min={0} placeholder="Price" onChange={onPriceChange} style={{display: "inline-block", width: "calc(100% - 100px"}} />
                        <Checkbox onChange={onSaleTypeChange} style={{marginLeft: "10px"}}>Auction</Checkbox>
                    </div>
                </div>
                <div classname="item_input_container" style={input_container}>
                    <div classname="quantity_input" style={input_style}>
                        <InputNumber min={1} placeholder="Quantity" onChange={onQuantityChange} style={{width: "100%"}}/>
                    </div>
                </div>
                <div classname="item_input_container" style={input_container}>
                    <div classname="location_input" style={input_style}>
                        <Input placeholder="Location or Dorm" value={location} onChange={onLocationChange} />
                    </div>
                </div>
                <div classname="item_input_container" style={input_container}>
                    <div classname="color_input" style={input_style}>
                        <Input placeholder="Color" value={color} onChange={onColorChange} />
                    </div>
                </div>
                <div classname="item_input_container" style={input_container}>
                    <div classname="description_input" style={input_style}>
                        <TextArea rows={5} placeholder="Description" value={description} onChange={onDescriptionChange}/>
                    </div>
                </div>
                <div classname="tags_input_container">
                    <div classname="tag1_container" style={{position: "absolute", marginTop: "10px", marginLeft: "24px"}}>
                        <img src={tag} alt="" style={png_style} />
                        <input placeholder="Tag 1" style={tag_style} onChange={onTag1Change} />
                    </div>
                    <div classname="tag2_container" style={{position: "absolute", marginTop: "10px", marginLeft: "154px"}}>
                        <img src={tag} alt="" style={png_style} />
                        <input placeholder="Tag 2" style={tag_style} onChange={onTag2Change} />
                    </div>
                    <div classname="tag2_container" style={{position: "absolute", marginTop: "10px", marginLeft: "294px"}}>
                        <img src={tag} alt="" style={png_style} />
                        <input placeholder="Tag 3" style={tag_style} onChange={onTag3Change} />
                    </div>  
                </div>
                <div classname="error_container" style={{}}>
                    {tagError
                        ?
                        <p style={{color: "red", marginTop: "50px", marginLeft: "24px"}}>*fill out at least one tag with a description</p>
                        :
                        <p style={{marginTop: "50px", marginLeft: "24px", height: "10px"}}></p>
                    }
                </div>
                <div classname="item_input_button" style={button_style}>
                    <Button type="primary" onClick={onCreateSale}>
                        List Item
                    </Button>
                </div>
                <Button href="/sell" style={{marginLeft: "24px"}}>Cancel</Button>
                <div classname="register_footer" style={footer_style}/>
            </div>
        </div>
    )
}

export default CreateSale;