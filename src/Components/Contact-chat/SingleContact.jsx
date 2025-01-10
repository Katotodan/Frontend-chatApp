import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const SingleContact = ({element, displayMsg, currentUserId}) => {
    const [lastMsg, setLastMsg] = useState("")
    const [lastMsgTime, setLastMsgTime] = useState("")
    const handleClick = () => {displayMsg(element)}
    // Get last message
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/singleContact/lastmessage/${element._id}/${currentUserId}`,{
            withCredentials: true, // Send credentials (cookies)
            headers: {
            'Content-Type': 'application/json',
            //   Authorization: `Bearer ${sessionToken}`, // Include the session token in the Authorization header
            },
        })
        .then((res) => {
            setLastMsg(res.data["lastMsg"])
            const date = new Date(res.data["time"])
            const hours = date.getHours();
            const minutes = date.getMinutes();
            setLastMsgTime(`${hours}:${minutes}`)
        }) 
        .catch((err) => console.log(err))
    }, [])
    
    // Is this user online?
  return (
    <div className="contact-chat" key={element._id} onClick = {handleClick}>
        <div className="photo">
            {element.image ? <img src={element.image} alt="" className="img" /> :
            <span className="img bg-slate-300">{element.username.slice(0,2).toUpperCase()}</span>
            }
        </div>
        <div className="name-msg">
            <p className="name">{element.username}</p>
            <p>{lastMsg}</p>
        </div>
        <div className="time">
            {lastMsgTime}
        </div>
    </div>
  )
}

