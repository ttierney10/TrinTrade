import React from 'react';
import _ from 'lodash';

function Populate(props) {
    var empty = props.items

    function split1(arr, l) {
        /*if(arr === -1){setEmpty(true)}
        else{setEmpty(false)}*/
        var newArr = []
        for(let x = 0; x < l; x += 3){
            newArr.push(arr[x])
        }
        return newArr
    }
    function split2(arr, l) {
        var newArr = []
        for(let x = 1; x < l; x += 3){
            newArr.push(arr[x])
        }
        return newArr
    }
    function split3(arr, l) {
        var newArr = []
        for(let x = 2; x < l; x += 3){
            newArr.push(arr[x])
        }
        return newArr
    }

    return(
        <div classname="populate_container">
            {empty === -1
                ?
                <p style={{fontSize: "large", marginBottom: "350px"}}>No results. Try another search.</p>
                :
                <div>
                    <div classname="items_container" style={{display: "inline-block", width: "33%"}}>
                        {
                            _.map(split1(props.items, props.len), (item) => {
                                return(
                                    <div classname="photo_container">
                                        <a href={`/Item/${item.id}`}>
                                            <img src={item.url} alt="" style={{width: "100%", marginBottom: "3px"}} />
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div classname="items_container" style={{display: "inline-block", width: "33%", marginLeft: ".5%", verticalAlign: "top"}}>
                        {
                            _.map(split2(props.items, props.len), (item) => {
                                return(
                                    <div classname="photo_container">
                                        <a href={`/Item/${item.id}`}>
                                            <img src={item.url} alt="" style={{width: "100%", marginBottom: "3px"}} />
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div classname="items_container" style={{display: "inline-block", width: "33%", cssFloat: "right"}}>
                        {
                            _.map(split3(props.items, props.len), (item) => {
                                return(
                                    <div classname="photo_container">
                                        <a href={`/Item/${item.id}`}>
                                            <img src={item.url} alt="" style={{width: "100%", marginBottom: "3px"}} />
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}
export default Populate;