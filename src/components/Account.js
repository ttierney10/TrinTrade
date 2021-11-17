import { Button, Input } from 'antd';
import React, { useState } from 'react';
import db, { auth } from '../firebase.js';
import { page_title, title_box } from './Elements/CreateSaleElements.js';
import { footer_style } from './Elements/RegisterElements.js';
import Header from "./Header/Header.js";

function Account() {
    const [user, setUser] = useState(auth.currentUser)
    const [username, setUsername] = useState('')
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [userID, setUserID] = useState('')
    const [password, setPassword] = useState('')
    const [id, setID] = useState('')
    const [editUser, setEditUser] = useState(false)
    const [editPass, setEditPass] = useState(false)
    const [userName, setUserName] = useState('')
    const [save, setSave] = useState(false)
    
    const onPassChange = (event) => {setPassword(event.target.value)}
    const onUserChange = (event) => {setUserName(event.target.value)}


    auth.onAuthStateChanged(user => {
        if(user){
            setUser(user)
            setUserID(user.uid)
            if(username === ''){
                let usersRef = db.collection("users")
                usersRef.get().then(users => {
                    users.forEach(user => {
                        let {uid} = user.data()
                        let {id} = user
                        if(uid === userID){
                            setUsername(user.data().username)
                            setFName(user.data().fname)
                            setLName(user.data().lname)
                            setEmail(user.data().trinEmail)
                            setID(id)
                        }
                    })
                })
            }
        }
    })

    function editPassword(){
        setEditPass(true)
        setSave(true)
    }
    function editUsername(){
        setEditUser(true)
        setSave(true)
    }
    function updateInfo(){
        if(editUser && userName !== ''){
            let userRef = db.collection("users").doc(id)
            let username = userName
            let uid = userID
            let trinEmail = email
            let payload = {fname, lname, trinEmail, uid, username}
            userRef.update(payload).then(user => {window.location.reload()})
        }
        if(editPass && password !== ''){
            var user = auth.currentUser
            user.updatePassword(password).then(user => {window.location.reload()})
        }
    }

    return (
        <div className="account_container">
            <Header page="Account"/>
            <div classname="title_container" style={title_box}>
                <h5 style={page_title}>
                    My Account
                </h5>
            </div>
            <p style={{borderStyle: "solid", backgroundColor: "#D4D4D4", marginLeft: "15%", borderColor: "#1C47B4", color: "black", width: "100px", marginBottom: "0", fontWeight: "bold"}}>Account Info</p>
            <div classname="info_container" style={{borderStyle: "solid", backgroundColor: "#D4D4D4", marginRight: "20%", marginLeft: "20%", borderColor: "#1C47B4"}}>
                <div classname="username_container" style={{height: "25px", borderStyle: "none none solid none", color: "black", borderColor: "#1C47B4"}}>
                    <p style={{width: "75%", display: "inline-block"}}>Username: {username}</p>
                    {editUser
                        ?
                        <Input value={userName} onChange={onUserChange} style={{height: "22px", display: "inline-block", float: "right", width:"25%"}}></Input>
                        :
                        <Button onClick={editUsername} type="link" style={{color: "#1C47B4", height: "20px", display: "inline-block", float: "right", textDecoration: "underline"}}>edit</Button>
                    }
                </div>
                <div classname="password_container" style={{height: "25px", color: "black", borderColor: "#1C47B4", borderStyle: "none none solid none"}}>
                    <p style={{width: "75%", display: "inline-block"}}>Password: ******</p>
                    {editPass
                        ?
                        <Input value={password} onChange={onPassChange} style={{height: "22px", display: "inline-block", float: "right", width:"25%"}}></Input>
                        :
                        <Button onClick={editPassword} type="link" style={{color: "#1C47B4", height: "20px", display: "inline-block", float: "right", textDecoration: "underline"}}>edit</Button>
                    }
                </div>
                <div classname="email_container" style={{height: "25px", color: "black", borderColor: "#1C47B4", borderStyle: "none none solid none"}}>
                    <p style={{width: "80%", display: "inline-block"}}>Email: {email}</p>
                </div>
                <div classname="name_container" style={{height: "20px", color: "black"}}>
                    <p style={{width: "80%", display: "inline-block"}}>Name: {fname.toUpperCase()} {lname.toUpperCase()}</p>
                </div>
            </div>
            <div>
                {save
                    ?
                    <Button onClick={updateInfo} style={{marginTop: "100px", marginRight: "25px", float: "right", backgroundColor: "#1C47B4", color: "white"}}>Save</Button>
                    :
                    <p></p>
                }
            </div>
            <div classname="register_footer" style={footer_style}/>
        </div>
    )
}

export default Account;