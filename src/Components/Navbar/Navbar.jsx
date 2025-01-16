import React, {useEffect, useState} from "react"
import axios from "axios"
import "./navbar.css"
import { Navigate } from "react-router-dom"
import { socket } from "../../socket"
import logo from "../../asserts/logo.png"
import { emitter } from "../../App"

axios.defaults.withCredentials = true;
export const Navbar = ({user}) =>{
    const [redirectUser, setRedirectUser] = useState(false)
    const [displayLogoutBtn, setDisplayLogoutBtn] = useState(false)
    useEffect(()=>{
        emitter.on("hideLogDropDown", ()=> setDisplayLogoutBtn(false))
         
    },[])
    const logoutFunc = (e) =>{
        e.preventDefault() 
        axios.post(`${process.env.REACT_APP_API_URL}/logout`, user
        , {
          withCredentials: true, // Send credentials (cookies)
          headers: {
            'Content-Type': 'application/json',
          //   Authorization: `Bearer ${sessionToken}`, // Include the session token in the Authorization header
          },
        }
        )
        .then((res) => {
            //  Redirect to login
            socket.disconnect()
            setRedirectUser(true)

        })
        .catch(err => console.log(err)) 
    
    }
    const buffer = new Uint8Array([user.image]); 
    const blob =   new Blob([buffer], { type: 'image/jpeg' }); 
    const url = URL.createObjectURL(blob)
    const displayLogOutbtn = () =>{
        displayLogoutBtn ? setDisplayLogoutBtn(false): setDisplayLogoutBtn(true)
    }

    return (
        <nav>
            {redirectUser && <Navigate to="/login"/>}
            <div>
                <img src={logo} alt="" className="logo"/>
            </div>
            
            <div className={displayLogoutBtn ? "user user-responsive" : "user"}>
                <div>
                    <p className={displayLogoutBtn ? "username-responsive" : "username"}>{user["username"]}</p>
                    {
                        user.image ? <img src={user.image} alt="" className="userImage" onClick={displayLogOutbtn}/> :
                        <span className="userImageText bg-slate-300"onClick={displayLogOutbtn}>{user["username"].slice(0,2).toUpperCase()}</span>
                    }
                    
                </div>
                <form onSubmit={logoutFunc}>
                    <button type="submit">Log out</button> 
                </form>
            </div>
        </nav> 
    )
} 