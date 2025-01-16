import React, {useEffect, useState, useRef} from "react";
import "./contact.css"
import axios from "axios";

import { SingleContact } from "./SingleContact";
import { SearchContact } from "./SearchContact";
import { emitter } from "../../App";


axios.defaults.withCredentials = true;
export const ContactChat = ({setDestination , setDestinationName, currentUserId, message})=>{
    const [contacts, setContact] = useState([])
    
    const [isMsgLoading, setIsMsgLoading] = useState(true)
    
    const getAllMessages = () =>{
        axios.get(`${process.env.REACT_APP_API_URL}/conversationList/${currentUserId}`,{
            withCredentials: true, // Send credentials (cookies)
            headers: {
            'Content-Type': 'application/json',
            //   Authorization: `Bearer ${sessionToken}`, // Include the session token in the Authorization header
            },
        })
        .then((res) => {
            setContact([...res.data])            
            setIsMsgLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setIsMsgLoading(false)
        })
    }
    useEffect( () => {
        getAllMessages()
        emitter.on("onMsgSend", () =>{
            getAllMessages()
            console.log("Emitter is working");
            
        })
    }, []) 
    // On receiveing new msg
    useEffect(()=>{
        if(message !== ""){
            // Check if that user exist in contatact and then update the contacts array
            getAllMessages()
        }
    }, [message])

    
    const displayMsg = (element) =>{
        setDestination(element._id)
        setDestinationName(element.username)
        
    }
    const updateContact =(e)=>{
        setContact([...e])
    }

    const contact = contacts.map((element, index) =>{
        return <SingleContact element={element} key={element._id} 
        displayMsg={displayMsg} currentUserId ={currentUserId}/>
    })
    

    return( 
        <>
        
        <div className="contacts-section">
            <div >
                <SearchContact updateContact = {updateContact} currentUserId= {currentUserId} />
                <div className="contact_container">
                    {contact.length > 0 ? <>{contact}</>:<>
                    {isMsgLoading ? <span className="no-conversation">
                        Loading ....</span> : 
                        <span className="no-conversation">There were no conversations found!</span>}
                    </>} 
                      
                </div>
            </div>
            
        </div>
        </>
    )
}

//Working on responsive nav bar from 600px