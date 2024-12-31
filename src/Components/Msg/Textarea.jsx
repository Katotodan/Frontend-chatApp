import React, {useState, useRef, useEffect} from 'react'
import "./textarea.css"

export const Textarea = ({addMessage, destination}) => {
    const [textareaValue, setTextareaValue] = useState("")
    const textarea = useRef(null)
    useEffect(() =>{
        setTextareaValue("")
    }, [destination])


    const handleChange = (e) => {
        setTextareaValue(e.target.value)
        textarea.current.style.height = "auto"
        const heigh = textarea.current.scrollHeight
        if(heigh < 100){
            textarea.current.style.height = heigh + "px"
        }else{
            textarea.current.style.height = "100px"
        }
    }
    const sendMsg = async (e) =>{
        e.preventDefault()
        addMessage(textareaValue)
        setTextareaValue("")
           
    }
  return (
    <form className="Search-bar" onSubmit={sendMsg}>
        <textarea name="textMessage" id="" value={textareaValue} autoFocus onChange={handleChange} 
        rows={1} ref={textarea}/>
        <button type="submit" >Send</button>
    </form>
  )
}
 
