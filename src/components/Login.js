import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { auth } from '../firebase.js';
import firebase from 'firebase/app';
import { Input, Button, PageHeader } from 'antd';
import { input_container } from './Elements/CreateSaleElements.js';
import { input_style, button_style, footer_style } from './Elements/RegisterElements.js';
import Home from './Home.js';

function Login(props) {

    const [trinEmail, setTrinEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signed_in, setSignedIn] = useState(false)
    const [forgotPass, setForgotPass] = useState(false)

    const onTrinEmailChange = (event) => setTrinEmail(event.target.value)
    const onPasswordChange = (event) => setPassword(event.target.value)

    function onForgotPass(){setForgotPass(true)}
    function resetPass(){
        auth.sendPasswordResetEmail(trinEmail)
        window.location.reload()
    }

    const onLogin = () => {

        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
            auth.signInWithEmailAndPassword(trinEmail, password)
            .then(function (result) {
                setSignedIn(auth.currentUser.emailVerified)
                window.location.replace("/home")
            });
        })
        

        setTrinEmail('')
        setPassword('')
    }
    return (
        <div classname="app_container">
            {!signed_in
                ?
                <div className="login_container">
                    <PageHeader style={{textAlign: "center", borderStyle: "solid", borderColor: "#1C47B4", fontSize: "xx-large", paddingTop: "0px", marginBottom: "125px", color: "#ECAB2E", backgroundColor: "#1C47B4"}}>Welcome to TrinTrade!</PageHeader>
                    {forgotPass    
                        ?
                        <div>
                            <div classname="register_input_container" style={input_container}>
                                <div classname="register_input_email" style={input_style}>
                                    <Input placeholder="Trinity E-mail" value={trinEmail} onChange={onTrinEmailChange} />
                                </div>
                            </div>
                            <Button onClick={resetPass} style={{backgroundColor: "#1C47B4", marginTop: "20px", color: "white", float: "right", marginRight: "30%"}}>Reset Password</Button>
                        </div>
                        :
                        <div classname="register_inputs_container">
                            <Button onClick={onForgotPass} type="link" style={{float: "right", marginRight: "30%"}}>Forgot Password?</Button>
                            <div classname="register_input_container" style={input_container}>
                                <div classname="register_input_email" style={input_style}>
                                    <Input placeholder="Trinity E-mail" value={trinEmail} onChange={onTrinEmailChange} />
                                </div>
                            </div>
                            <div classname="register_input_container" style={input_container}>
                                <div classname="register_input_password" style={input_style}>
                                    <Input.Password placeholder="Password" value={password} onChange={onPasswordChange} />
                                </div>
                            </div>
                            <div classname="register_input_button" style={button_style}>
                                <Link to="/register" style={{display: "inline-block", marginRight: "10px"}}>Register</Link>
                                <Button type="primary" onClick={onLogin} style={{display: "inline-block"}}>
                                    Login
                                </Button>
                            </div>
                        </div>
                    }
                    <div classname="register_footer" style={footer_style}/> 
                </div>
                :
                <Home />
            }
            
        </div>
    )
}

export default Login;