import React, {useEffect, useState, useRef} from "react";
import "./contact.css"
import axios from "axios";
import { SingleContact } from "./SingleContact";
import { SearchContact } from "./SearchContact";

export const ContactChat = ({setDestination , setDestinationName, currentUserId})=>{
    const [contacts, setContact] = useState([])
    const menu = useRef(null)
    const menuContainer = useRef(null)
    const [isMenuIcon, setIsMenuIcon]  = useState(true)
    

    useEffect( () => {
        axios.get(`${process.env.REACT_APP_API_URL}/conversationList/${currentUserId}`,{
            withCredentials: true, // Send credentials (cookies)
            headers: {
            'Content-Type': 'application/json',
            //   Authorization: `Bearer ${sessionToken}`, // Include the session token in the Authorization header
            },
        })
        .then((res) => {
            setContact([...res.data])
        })
        .catch((err) => console.log(err))
    }, []) 
    
    const displayMenu = (e)=>{ isMenuIcon ? setIsMenuIcon(false) : setIsMenuIcon(true)}
    const displayMsg = (element) =>{
        setDestination(element._id)
        setDestinationName(element.username)
        // Removing the menu in table view point
        displayMenu()
        
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
        <div className="menu-displayer" onClick={displayMenu} >
                {isMenuIcon ? <span>&#8801;</span>: <span className="text-red-600">&#10006;</span>}
        </div>
        <div className={ isMenuIcon ? "contacts-section " : "contacts-section sm-device-view"} ref={menuContainer}>
            
            <div className={isMenuIcon ? "menu active" : "menu nonActive"} ref={menu}>
                <SearchContact updateContact = {updateContact} currentUserId= {currentUserId} />
                <div className="contact_container">
                    {contact.length > 0 ? <>{contact}</>:<>
                        <span className="no-conversation">There were no conversations found!</span> 
                    </>} 
                      
                </div>
            </div>
            
        </div>
        </>
    )
}

//Working on responsive nav bar from 600px