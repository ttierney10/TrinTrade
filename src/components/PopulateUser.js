import React, { useState } from 'react';
import _ from 'lodash';
import ItemSnippetUser from './ItemSnippetUser.js';

function PopulateUser(props){

    const items = useState(props.items)

    return(
        <div classname="populate_container" style={{paddingBottom: "100px"}}>
            {items
                ?
                <div>
                    {
                        _.map(props.items, (item) => {
                            return(
                                <ItemSnippetUser name={item.name} condition={item.condition} quantity={item.quantity} sold={item.sold}
                                color={item.color} price={item.price} location={item.location} url={item.url} id={item.id} saleType={item.saleType}/>
                            )
                        })
                    }
                </div>
                :
                <p style={{textAlign: "center"}}>they have no items for sale</p>
            }
        </div>
    )
}

export default PopulateUser