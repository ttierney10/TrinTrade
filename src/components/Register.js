import React, {useState} from 'react';
import {title_box, page_title, input_container} from './Elements/CreateSaleElements.js';
import {input_style, button_style, header_style, header_title_style, error_style, footer_style, 
        thanks_text, check_style, verify_text, signin_button} from './Elements/RegisterElements.js';
import {Input, Button} from 'antd';
import db, {auth} from '../firebase.js';
import check from './Elements/check.jpeg';

function Register(props) {

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [username, setUsername] = useState('')
    const [trinEmail, setTrinEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cfmPassword, setCfmPassword] = useState('')
    const [Error, setError] = useState(false)
    const [PWDError, setPWDError] = useState(false)
    const [EmailError, setEmailError] = useState(false)
    const [registered, setRegistered] = useState(false)
    const [fnameInput, setFnameInput] = useState(false)
    const [lnameInput, setLnameInput] = useState(false)
    const [usernameInput, setusernameInput] = useState(false)
    const email_check = "trincoll.edu"

    const onFNameChange = (event) => {
        setFname(event.target.value)
        setFnameInput(true)
    }
    const onLNameChange = (event) => {
        setLname(event.target.value)
        setLnameInput(true)
    }
    const onUsernameChange = (event) => {
        setUsername(event.target.value)
        setusernameInput(true)
    }
    const onTrinEmailChange = (event) => setTrinEmail(event.target.value)
    const onPasswordChange = (event) => setPassword(event.target.value)
    const onCfmPasswordChange = (event) => setCfmPassword(event.target.value)
    
    const onRegister = () => {
        let postRef = db.collection('users')
        if(fnameInput && lnameInput && usernameInput){
            setError(false)
            if(password === cfmPassword){
                if(trinEmail.includes(email_check)){
                    auth.createUserWithEmailAndPassword(trinEmail, password)
                        .then((userCredential) => {
                            var user = userCredential.user
                            var uid = user.uid
                            let payload = {fname, lname, username, trinEmail, uid}
                            postRef.add(payload)
                            setRegistered(true)
                            console.log(auth.currentUser.sendEmailVerification())
                            //possibly make it so that an error in email verification causes the registration to fail and reset
                        })
                        .catch( function (error){
                            setError(true)
                            setTrinEmail((trinEmail) => '')
                            setPassword((password) => '')
                            setCfmPassword((cfmPassword) => '')
                    });
                }
                else{
                    setEmailError(true)
                    setTrinEmail((trinEmail) => '')
                    setPassword((password) => '')
                    setCfmPassword((cfmPassword) => '')
                }
            }
            else{
                setPWDError(true)
                setPassword((password) => '')
                setCfmPassword((cfmPassword) => '')
            }
        }
        else{
            setError(true)
        }
    }

    return (
        <div className="register_container">
            <div classname="header_container" style={header_style}>
                <div classname="header_text" style={header_title_style}>
                    TrinTrade
                </div>
            </div>
            <div classname="title_container" style={title_box}>
                <h6 style={page_title}>
                    Register
                </h6>
            </div>
            {!registered
                ?
                <div classname="register_inputs_container">
                    <div classname="register_input_container">
                        <div classname="register_input_fname" style={input_style}>
                            <Input placeholder="First Name" value={fname} onChange={onFNameChange} required/>
                        </div>
                    </div>
                    <div classname="register_input_container" style={input_container}>
                        <div classname="register_input_lname" style={input_style}>
                            <Input placeholder="Last Name" value={lname} onChange={onLNameChange} />
                        </div>
                    </div>
                    <div classname="register_input_container" style={input_container}>
                        <div classname="register_input_username" style={input_style}>
                            <Input placeholder="Username" value={username} onChange={onUsernameChange} />
                        </div>
                    </div>
                    <div classname="register_input_container" style={input_container}>
                        <div classname="register_input_email">
                            <Input placeholder="Trinity Email" value={trinEmail} onChange={onTrinEmailChange} style={{display: "inline-block", width: "40%", marginLeft: "30%"}}/>
                            {EmailError
                                ?
                                <p style={{display: "inline-block", wordWrap: "normal", fontSize: "small", color: "red", marginLeft: "5px", width: "28%"}}>Enter a Trinity College email</p>
                                :
                                <p></p>
                            }
                        </div>
                    </div>
                    <div classname="register_input_container" style={input_container}>
                    <h7 style={{marginLeft: "30%"}}>password must be 6 characters.</h7>
                        <div classname="register_input_password" style={input_style}>
                            <Input.Password placeholder="Password" value={password} onChange={onPasswordChange} />
                        </div>
                    </div>       
                    <div classname="register_input_container" style={input_container}>
                        <div classname="register_input_cfmPassword">
                            <Input.Password placeholder="Confirm Password" value={cfmPassword} onChange={onCfmPasswordChange} style={{display: "inline-block", width: "40%", marginLeft: "30%"}}/>
                            {PWDError
                                ?
                                <p style={{display: "inline-block", wordWrap: "normal", fontSize: "small", color: "red", marginLeft: "5px"}}>passwords must match.</p>
                                :
                                <p></p>
                            }
                        </div>
                    </div>
                    {Error
                        ?
                        <p style={error_style}>please fill out all forms correctly.</p>
                        :
                        <p></p>
                    }
                    <div classname="register_links" >
                        <div classname="sign_in_button" style={{textAlign: "center"}}>
                            <Button type="link" href="./">
                            Already have an account, Sign In
                            </Button>
                        </div>
                        <div classname="register_input_button" style={button_style}>
                            <Button type="primary" onClick={onRegister} style={{marginBottom: "100px"}}>
                                Register
                            </Button>
                        </div>
                    </div>
                </div>
                :
                <div classname="completed_registration_container">
                    <div classname="test_box">
                        <div classname="text1" style={thanks_text}>
                            Thank You!
                        </div>
                        <img src={check} alt="checkmark" style={check_style}/>
                        <div classname="email_verify" style={verify_text}>
                            <p style={{marginTop: "10px", height: "10px"}}>An email has been sent to {trinEmail}</p>
                            <h8 style={{marginTop: "0px"}}>with instructions to verify your account.</h8>
                            <p style={{textDecoration: "underline"}}>check spam.</p>
                        </div>
                        
                    </div>
                    <Button type="primary" href="./" style={signin_button}>
                        Go To Sign in
                    </Button>
                </div>
            }
            <div classname="register_footer" style={footer_style}/>
        </div>
    )
                
}

export default Register;