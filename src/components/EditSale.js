import React, { useEffect, useState } from 'react';
import Header from "./Header/Header.js";
import {useParams} from 'react-router-dom';
import db from '../firebase.js';
import { Button } from 'antd';
import PopulateEdit from './PopulateEdit.js'
import {title_box, page_title, footer_style} from './Elements/CreateSaleElements.js';

function EditSale(props) {
    const [items, setItems] = useState('')

    let {id} = useParams()

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
        })
    })

    return (
        <div className="edit_sale_container">
            <Header page="Selling"/>
            <div classname="title_container" style={title_box}>
                <h5 style={page_title}>
                    Edit Sale
                </h5>
            </div>
            {items
                ?
                <PopulateEdit id={id} name={items.name} condition={items.condition} price={items.price} quantity={items.quantity} 
                location={items.location} color={items.color} description={items.description} tag1={items.tag1} tag2={items.tag2}
                tag3={items.tag3} url={items.url} saleType={items.saleType} file={items.url} sold={items.sold} sellerID={items.sellerID}
                username={items.username} />
                :
                <p></p>
            }
            <Button href="/sell">Cancel</Button>
            <div classname="register_footer" style={footer_style}/>
        </div>
    )
}

export default EditSale;