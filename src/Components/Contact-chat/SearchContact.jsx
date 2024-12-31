import React,{useEffect,useState, useRef} from 'react'
import axios from 'axios'

export const SearchContact = ({currentUserId, updateContact}) => {
    const [searchUserValue, setSearchUserValue] = useState("")
    const isInitialRender = useRef(true)
    useEffect(()=>{
        if (isInitialRender.current) {
            // Skip running the effect on the initial render
            isInitialRender.current = false;
          } else {
            let uri
            if(searchUserValue){
                uri = `${process.env.REACT_APP_API_URL}/contact/${searchUserValue}`
            }else{
                uri = `${process.env.REACT_APP_API_URL}/conversationList/${currentUserId}`
            }

            axios.get(uri,{
                withCredentials: true, // Send credentials (cookies)
                headers: {
                'Content-Type': 'application/json',
                //   Authorization: `Bearer ${sessionToken}`, // Include the session token in the Authorization header
                },
            })
            .then((res) => {
                updateContact(res.data)
            })
            .catch((err) => console.log(err))
        }
    }, [searchUserValue])

    const handleSearch = (e) =>{
        setSearchUserValue(e.target.value)
    }

  return (
    <div className="search-form-container">
        <form action="">
            <input type="text" placeholder="Search by username" 
            value={searchUserValue} onChange={handleSearch}/>
        </form>
    </div>
  )
}
