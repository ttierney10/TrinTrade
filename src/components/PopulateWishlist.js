import React, { useEffect } from 'react';
import {getItems} from './Elements/WishlistItems.js';
import _ from 'lodash';
import ListItemSnippet from './ListItemSnippet.js';

function PopulateWishlist(props){
    const list = props.wishlist
    const length = list.length    
    
    return(
        <div classname="list_container">
            {props.list === "Wishlist" && length > 0
                ?
                <div>
                    {
                        _.map(getItems(props.wishlist, props.items, props.listID), (item) => {
                            return(
                                <ListItemSnippet itemlistID={item.listID} userID={props.userID} name={item.item.name} condition={item.item.condition} quantity={item.item.quantity} sold={item.item.sold}
                                color={item.item.color} price={item.item.price} location={item.item.location} url={item.item.url} id={item.item.id} saleType={item.item.saleType}/>
                            )
                        })
                    }
                </div>
                :
                <p style={{textAlign: "center"}}>you have no items on your wishlist</p>
            }
        </div>
    )
}

export default PopulateWishlist;