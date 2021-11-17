import React, { useEffect, useState } from 'react';
import Header from "./Header/Header.js";
import {Input, Checkbox, Button, InputNumber} from 'antd';
import {footer_style} from './Elements/RegisterElements.js';
import {search_box, items_box, filters_box} from './Elements/HomeElements.js';
import db, { auth } from '../firebase.js';
import Populate from './Populate.js';
import _ from 'lodash';
import {filterFunction, queryFunction} from './Elements/Search&Filter.js';

function Home(props) {
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState(false)
    const [filterInput, setFilterInput] = useState(false)
    const [items, setItems] = useState([])
    const [searchItems, setSearchItems] = useState([])
    const [filterItems, setFilterItems] = useState([])
    const colors1 = [{label: 'Black', value: 'Black'}, {label: 'White', value: 'White'}, {label: 'Yellow', value: 'Yellow'}, 
                    {label: 'Green', value: 'Green'}, {label: 'Brown', value: 'Brown'}, {label: 'Orange', value: 'Orange'}]
    const colors2 = [{label: 'Blue', value: 'Blue'}, {label: 'Grey', value: 'Grey'}, {label: 'Red', value: 'Red'}, 
                    {label: 'Beige', value: 'Beige'}, {label: 'Purple', value: 'Purple'}]
    const [checkedColors1, setCheckedColors1] = useState([])
    const [checkedColors2, setCheckedColors2] = useState([])
    const [allItems, setAllItems] = useState([])
    const [color, setColor] = useState('')
    const [allSearchItems, setAllSearchItems] = useState([])
    const [New, setNew] = useState(false)
    const [used, setUsed] = useState(false)
    const [fixed, setFixed] = useState(false)
    const [auction, setAuction] = useState(false)
    const [maxPrice, setMaxPrice] = useState(0)
    const [location, setLocation] = useState('')
    const [user, setUser] = useState(auth.currentUser)

    const onUsedChange = (event) => setUsed(event.target.checked)
    const onNewChange = (event) => setNew(event.target.checked)
    const onAuctionChange = (event) => setAuction(event.target.checked)
    const onFixedChange = (event) => setFixed(event.target.checked)
    const onColorChange = (event) => setColor(event.target.value)
    function onMaxChange(value){setMaxPrice(value)}
    const onLocationChange = (event) => setLocation(event.target.value)

    auth.onAuthStateChanged(user => {
        if(user){setUser(user)}
    })

    const onSearchChange = (event) => {
        setSearch(event.target.value.toLowerCase())
    }

    function cancelSearch(){
        setSearchInput(false)
        setSearch('')
    }

    function onCheckboxChange1(checkedValues){
        setCheckedColors1(checkedValues)
    }
    function onCheckboxChange2(checkedValues){
        setCheckedColors2(checkedValues)
    }

    const removeFilter = (event) => {
        if(searchInput){
            setSearchItems(allSearchItems)
        }
        else{
            setFilterInput(false)
            setItems(allItems)
        }
    }

    const onFilter = (event) => {
        let condition = -1
        let saleType = -1
        if(New && !used){condition=true}
        else if(used && !New){condition=false}
        if(fixed && !auction){saleType=false}
        else if(auction && !fixed){saleType=true}
        let checkedColors = checkedColors1.concat(checkedColors2)
        if(searchInput){setSearchItems(filterFunction(allSearchItems, checkedColors, color, condition, saleType, maxPrice, location))}
        else{setFilterItems(filterFunction(allItems, checkedColors, color, condition, saleType, maxPrice, location))
            setFilterInput(true)}
    }

    const runSearch = (event) => {
        setSearchItems(queryFunction(items, search))
        setSearchInput(true)
        setAllSearchItems(queryFunction(items, search))
    }

    useEffect(() => {
        setUser(auth.currentUser)
        auth.onAuthStateChanged(user => {
            if(user){
                setUser(user)
                let arr = []
                let itemsRef = db.collection("items")
                itemsRef.get().then(items => {
                    items.forEach(item => {
                        let data = item.data()
                        let {id} = item

                        let payload = {
                            id,
                            ...data
                        }
                        arr.push(payload)
                    })
                    setAllItems([])
                    setItems([])
                    _.map(arr, (item) => {
                        if(item.sellerID !== user.uid)
                        setItems((items) => [...items, item])
                        setAllItems((allItems) => [...allItems, item])
                    })
                })
            }
        })
    }, [search, searchInput, allItems, allSearchItems])

    return (
        <div className="home_container">
            <Header page="Home"/>
            <div classname="search_container" style={search_box}>
                <Input placeholder="Search" value={search} onChange={onSearchChange} onPressEnter={runSearch}/>
            </div>
            {searchInput
                ?
                <div classname="cancel_search_container" style={{display: "inline-block", width: "45%", marginBottom: "14px", color: "#1C47B4"}}>
                    <Button type="link" onClick={cancelSearch}>cancel search</Button>
                </div>
                :
                <p></p>
            }
            <div classname="filters_container" style={filters_box}>
                <p style={{fontWeight: "bold", paddingLeft: "10px", fontSize: "large", borderStyle: "none none solid none", marginBottom: "5px"}}>Filter Items</p>
                <div classname="price_filter_container" style={{marginLeft: "5px", marginRight: "15px"}}>
                    <div classname="price_input_container">
                        <p style={{height: "10px", display: "inline-block", width: "45%"}}>Max Price</p>
                        <div classname="max_input_container" style={{display: "inline-block", width: "50%"}}>
                            <InputNumber min={0} value={maxPrice} onChange={onMaxChange}/>
                        </div>
                    </div>
                </div>
                <div classname="condition_container" style={{marginBottom: "10px", marginTop: "10px"}}>
                    <div classname="new_container" style={{width: "45%", display: "inline-block", marginLeft: "5px"}}>
                        <Checkbox onChange={onNewChange}>New</Checkbox>
                    </div>
                    <div classname="used_container" style={{width: "45%", display: "inline-block"}}>
                        <Checkbox onChange={onUsedChange}>Used</Checkbox>
                    </div>
                </div>
                <Input placeholder="Location" value={location} onChange={onLocationChange} style={{width: "80%", marginLeft: "5px", marginBottom: "10px"}}/>
                <Input placeholder="Color" value={color} onChange={onColorChange} style={{width: "80%", marginLeft: "5px", marginBottom: "5px"}}/>
                <Checkbox.Group options={colors1} onChange={onCheckboxChange1} style={{width: "51%", display: "inline-block", marginLeft: "5px"}}></Checkbox.Group>
                <Checkbox.Group options={colors2} onChange={onCheckboxChange2} style={{width: "46%", display: "inline-block", verticalAlign: "top"}}></Checkbox.Group>
                <div classname="saleType_container" style={{marginBottom: "10px", marginTop: "15px"}}>
                    <div classname="fixed_container" style={{width: "47%", display: "inline-block", marginLeft: "5px"}}>
                        <Checkbox onChange={onFixedChange}>Fixed</Checkbox>
                    </div>
                    <div classname="auction_container" style={{width: "50%", display: "inline-block"}}>
                        <Checkbox onChange={onAuctionChange}>Auction</Checkbox>
                    </div>
                </div>
                <Button type="primary" onClick={onFilter} style={{float: "right", marginTop: "10px"}}>Filter</Button>
                <Button onClick={removeFilter} style={{marginTop: "10px"}}>Disable</Button>
            </div>
            <div classname="items_box_container">
                {!searchInput
                    ?
                    <div>
                        {filterInput
                            ?
                            <div classname="filter_items_container" style={items_box}>
                                <Populate items={filterItems} len={filterItems.length}/>
                            </div>
                            :
                            <div classname="items_container" style={items_box}>
                                <Populate items={items} len={items.length}/>
                            </div>
                        }
                    </div>
                    :
                    <div classname="items_container" style={items_box}>
                        <Populate items={searchItems} len={searchItems.length}/>
                    </div>
                }
            </div>            
            <div classname="register_footer" style={footer_style}/>
        </div>
    )
}

export default Home;