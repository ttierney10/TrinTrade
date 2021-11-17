import React from 'react';
import _ from 'lodash';

function PopulateSavedSellers(props){
    const list = props.sellersList
    const length = list.length
    
    return(
        <div classname="list_container" style={{marginLeft: "20%", marginRight: "20%"}}>
            {props.list === "SavedSellers" && length > 0
                ?
                <div>
                    {
                        _.map(props.sellersList, (seller) => {
                            return(
                               <div classname="seller_container">
                                    <a href={`/user/${seller.data().sellerID}`}>
                                        <p style={{borderStyle: "solid", borderRadius: "5px", borderColor: "#1C47B4", color: "#1C47B4"}}>{seller.data().sellerUsername}</p>
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
                :
                <p style={{textAlign: "center"}}>you have no sellers on your saved sellers list</p>
            }
        </div>
    )
}

export default PopulateSavedSellers;