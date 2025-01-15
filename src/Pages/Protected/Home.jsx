import React, {useEffect, useState} from "react";
import "./Home.css"
import { Navbar } from "../../Components/Navbar/Navbar";

import { ContactChat } from "../../Components/Contact-chat/Contact";
import {Msg} from "../../Components/Msg/Message"
import { socket } from "../../socket";
import { useLoaderData } from "react-router-dom";
import { emitter } from "../../App";



export const Home = () =>{
    const user = useLoaderData(); 

    const [newMsg, setNewMsg] = useState("")
    const [isMenuIcon,setIsMenuIcon] = useState(true)
    
    
    useEffect(() =>{ 
        socket.connect()
        socket.emit("user_connect", user.id)
      
        function onDisconnect() {
            socket.emit("user_disconnect", user.id)
        }
    
        function sendSpecificMsg([senderId, message]) {
            setNewMsg([senderId, message])
            
        }     
      
        socket.on('disconnect', onDisconnect);
        socket.on('sendSpecificMsg', sendSpecificMsg);
    
        return () => {
            socket.disconnect();
            socket.off('disconnect', onDisconnect);
            socket.off('sendSpecificMsg', sendSpecificMsg);
        };
        
    },[]) 
    

    const [destination, setDestination] = useState("")
    const [destinationName, setDestinationName] = useState("")
    
    const toUser = (id) =>{
        setDestination(id) 
        setIsMenuIcon(true)
    }
    const toUser_name = (name) =>{
        setDestinationName(name)
    }
    const displayMenu = () =>{setIsMenuIcon(!isMenuIcon)}
    
    return(        
        <div>
            <Navbar user={user}/>
            <main onClick={() => {emitter.emit("hideLogDropDown")}}>
            <div className="menu-displayer" onClick={displayMenu} >
                    {isMenuIcon ? <span>&#8801;</span>: <span className="text-red-600">&#10006;</span>}
            </div>
                <div className={isMenuIcon ? "contact--container hide" : "contact--container show"}>
                    <ContactChat setDestination = {toUser} 
                    setDestinationName ={toUser_name} currentUserId={user.id} message={newMsg}/>    
                </div>
                
                <div className="message--container">
                    {destination ? (
                        <Msg destination={destination} 
                            destinationName={destinationName} 
                            message = {newMsg}
                            user = {user}
                        />
                    ): (  
                        <div className="welcoming-msg">
                            <h2 >Hey <strong>{user.username}</strong> ! Welcome to SOMA!!!</h2>
                            <h3>Select an user to start a conversation 😎😎😎</h3>
                        </div>
                    )}
                    
                </div>
            </main> 
        </div>
        
    )
}