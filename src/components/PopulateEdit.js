import React, { useEffect, useState } from 'react';
import { Input, Checkbox, InputNumber, Button } from 'antd';
import {input_style, button_style, input_container, tag_style, png_style, checkbox_style} from './Elements/CreateSaleElements.js';
import db, {storage, auth} from "../firebase.js";
import tag from './Elements/TagInput.png';
import './Elements/CreateSale.css';
const { TextArea } = Input;

function PopulateEdit(props) {

    const [name, setName] = useState(props.name)
    const [color, setColor] = useState(props.color)
    const [quantity, setQuantity] = useState(props.quantity)
    const [description, setDescription] = useState(props.description)
    const [tag1, setTag1] = useState(props.tag1)
    const [tag2, setTag2] = useState(props.tag2)
    const [tag3, setTag3] = useState(props.tag3)
    const [condition, setCondition] = useState(props.condition)
    const [preview, setPreview] = useState(props.url)
    const [location, setLocation] = useState(props.location)
    const [price, setPrice] = useState(props.price)
    const [saleType, setSaleType] = useState(props.saleType)
    const [file, setFile] = useState(props.file);
    const [tagError, setTagError] = useState(false);
    const sellerID = props.sellerID
    const username = props.username

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
    const [imgChange, setIMGChange] = useState(false)

    function handleChange(e) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]))
      setIMGChange(true)
    }

    useEffect(() => {
        let user = auth.currentUser

    })

    const onEditSale = (e) => {
        e.preventDefault();
        if(imgChange){
            const uploadTask = storage.ref(`/images/${file.name}`).put(file);
            uploadTask.on("state_changed", console.log, console.error, () => {
                storage
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then((url) => {
                        setFile(null);
                        let sold = props.sold
                        let itemRef = db.collection("items").doc(props.id)
                        let payload = {name: name, color: color, quantity: quantity, url: url, description: description, 
                            tag1: tag1, tag2: tag2, tag3: tag3, location: location, price: price, saleType: saleType, condition: condition, 
                            sellerID: sellerID, username: username, sold: sold}
                        itemRef.update(payload).then(() => {
                            window.location.replace('/sell')
                        })
                    })
            })
        }
        else{
            let url = props.url
            let sold = props.sold
            let itemRef = db.collection("items").doc(props.id)
            let payload = {name: name, color: color, quantity: quantity, url: url, description: description, 
                tag1: tag1, tag2: tag2, tag3: tag3, location: location, price: price, saleType: saleType, condition: condition, 
                sellerID: sellerID, username: username, sold: sold}
            itemRef.update(payload).then(() => {
                window.location.replace('/sell')
            })
        }

    }

    return (
        <div className="createsale_container">
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
                        <InputNumber min={0} placeholder="Price" defaultValue={price} onChange={onPriceChange} style={{display: "inline-block", width: "calc(100% - 100px"}} />
                        <Checkbox onChange={onSaleTypeChange} style={{marginLeft: "10px"}}>Auction</Checkbox>
                    </div>
                </div>
                <div classname="item_input_container" style={input_container}>
                    <div classname="quantity_input" style={input_style}>
                        <InputNumber min={1} defaultValue={quantity} placeholder="Quantity" onChange={onQuantityChange} style={{width: "100%"}}/>
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
                        <input placeholder="Tag 1" defaultValue={tag1} style={tag_style} onChange={onTag1Change} />
                    </div>
                    <div classname="tag2_container" style={{position: "absolute", marginTop: "10px", marginLeft: "154px"}}>
                        <img src={tag} alt="" style={png_style} />
                        <input placeholder="Tag 2" defaultValue={tag2} style={tag_style} onChange={onTag2Change} />
                    </div>
                    <div classname="tag2_container" style={{position: "absolute", marginTop: "10px", marginLeft: "294px"}}>
                        <img src={tag} alt="" style={png_style} />
                        <input placeholder="Tag 3" defaultValue={tag3} style={tag_style} onChange={onTag3Change} />
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
                <Button type="primary" onClick={onEditSale}>
                    Save
                </Button>
            </div>
            </div>
        </div>
    )
}

export default PopulateEdit;