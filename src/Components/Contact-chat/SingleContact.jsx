import React, { useEffect, useState } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true;

export const SingleContact = ({element, displayMsg, currentUserId}) => {
    const [lastMsgTime, setLastMsgTime] = useState("")
    
    const [chatDestinationUser, setChatDestinationUser] = useState({})

    const chatDestination = element.sender === currentUserId ? element.receiver : element.sender

    const handleClick = () => {        
        displayMsg(chatDestinationUser)
    }
    
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/chat_info/${chatDestination}`,{
            withCredentials: true, // Send credentials (cookies)
            headers: {
            'Content-Type': 'application/json',
            //   Authorization: `Bearer ${sessionToken}`, // Include the session token in the Authorization header
            },
        })
        .then((res) => {
            setChatDestinationUser({...res.data})
            
        }) 
        .catch((err) => {
            console.log(err)
            setChatDestinationUser({...element})
        })
    }, [])
    
    // Is this user online?
  return (
    <div className="contact-chat" key={element._id} onClick = {handleClick}>
        <div className="photo">
            {chatDestinationUser.image ? <img src={chatDestinationUser.image} alt="" className="img" /> :
            <span className="img bg-slate-300">{chatDestinationUser.username?.slice(0,2).toUpperCase()}</span>
            }
        </div>
        <div className="name-msg">
            <p className="name">{chatDestinationUser.username}</p>
            <p>{element["message"].length > 10 ? element["message"].substring(0, 9) + " ..." : element["message"]}</p>
        </div>
        {element["time"] && <div className="time">
            {new Date(element["time"]).getHours()  > 9 ? new Date(element["time"]).getHours() : "0" + new Date(element["time"]).getHours()}: 
            {new Date(element["time"]).getMinutes()  > 9 ? new Date(element["time"]).getMinutes() : "0" + new Date(element["time"]).getMinutes()}   
        </div>
        }
    </div>
  )
}

