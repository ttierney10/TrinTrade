import React from 'react';
import {Nav, NavLink, LogLink, NavMenu} from './NavBarElements.js';
import { auth } from '../../firebase.js';

const NavBar = (props) => {
    //const [signed_out, setUser] = useState(false)

    auth.onAuthStateChanged(function (user) {
        if (user) {
        //setUser(user)
        }
        else {

        }
    })

    const onSignOut = () => {
        auth.signOut().then(function () {
        });
        
    }

    const welcome = {
        textAlign: "center",
        display: "inline-block",
        color: "#ECAB2E",
        fontSize: "13.5px",
        paddingBottom: "10px"
      }
      const alr = {
          cssFloat: "right",
          display: "inline-block",
          marginRight: "10px"
      }

    return (
        <div className="navbar_container">
            <Nav>
                <NavMenu>
                    <LogLink to="/" onClick={onSignOut}>
                        Sign out
                    </LogLink>
                    <h3 style={welcome}>
                        Hello {props.fname}!
                    </h3>
                    <h4 style={alr}>
                        <NavLink to="/sell" activeStyle>
                            Sell
                        </NavLink>
                        <NavLink to="/lists" activeStyle>
                            Lists
                        </NavLink>
                        <NavLink to="/messages" activeStyle>
                            Messages
                        </NavLink>
                        <NavLink to="/account" activeStyle>
                            Account
                        </NavLink>
                        <NavLink to="/home" activeStyle>
                            Home
                        </NavLink>
                    </h4>
                </NavMenu>
            </Nav>
        </div>
    )
}

export default NavBar;