import React, { useState } from 'react';
import _ from 'lodash';
import ItemSnippet from './ItemSnippet.js';

function PopulateSell(props){

    const items = useState(props.items)

    return(
        <div classname="populate_container">
            {items
                ?
                <div>
                    {
                        _.map(props.items, (item) => {
                            return(
                                <ItemSnippet name={item.name} condition={item.condition} quantity={item.quantity} sold={item.sold}
                                color={item.color} price={item.price} location={item.location} url={item.url} id={item.id} saleType={item.saleType}/>
                            )
                        })
                    }
                </div>
                :
                <p style={{textAlign: "center"}}>you have no items for sale</p>
            }
        </div>
    )
}

export default PopulateSell