import React, { useEffect, useState } from 'react';
import NavBar from "./NavBar.js";
import logo from './Icon.png';
import db, { auth } from '../../firebase.js';
import 'firebase/auth';
import _ from 'lodash';

function Header(props) {
    const [user, setUser] = useState(auth.currentUser)
    const [userID, setUserID] = useState('')
    const [username, setUsername] = useState('')

    auth.onAuthStateChanged(user => {
        if(user){setUser(user)}
    })

    const header_box = {
        backgroundColor: "#1C47B4"
    }

    const logo_style = {
        height: "60px",
        marginLeft: "20px"
    }

    useEffect(() => {
        let currUser = user
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
    })

    return (
        <div className="header_container" style={header_box}>
            <NavBar fname={username}/>
            <div classname="icon" style={{display: "inline-block"}}>
                <img src={logo} alt="icon" style={logo_style} />
            </div>
            <p style={{display: "inline-block", fontSize: "xx-large", height: "0", marginLeft: "15px", color: "#ECAB2E", width: "0%"}}>{props.page}</p>
        </div>
    )
}

export default Header;