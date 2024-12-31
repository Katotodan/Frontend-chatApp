import React, {useEffect, useState} from "react";
import "./Home.css"
import { Navbar } from "../../Components/Navbar/Navbar";

import { ContactChat } from "../../Components/Contact-chat/Contact";
import {Msg} from "../../Components/Msg/Message"
import { socket } from "../../socket";
import { useLoaderData } from "react-router-dom";


export const Home = () =>{
    const user = useLoaderData(); 

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [newMsg, setNewMsg] = useState("")
    
    
    useEffect(() =>{ 
        socket.connect()
        socket.emit("user_connect", user.id)
      
        function onDisconnect() {
            setIsConnected(false);
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
    }
    const toUser_name = (name) =>{
        setDestinationName(name)
    }
    
    
    return(        
        <div>
            <Navbar user={user}/>
            <main>
                <div className="contact--container">
                    <ContactChat setDestination = {toUser} 
                    setDestinationName ={toUser_name} currentUserId={user.id}/>    
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