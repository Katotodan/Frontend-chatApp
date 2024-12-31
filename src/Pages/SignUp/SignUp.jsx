import React, {useState, useEffect, useContext, useRef} from "react";
import axios from "axios";
import { CurrentUserContext } from "../../App";
import { Navigate, Link } from "react-router-dom";
//import "./signup.css"

export const SingUp = () =>{
      
    const [userInfo, setUserInfo] = useState({"username": "", "password": ""})
    const [errorMsg, setErrorMsg] = useState(null)
    const [navigateToHome, setNavigateToHome] = useState(false)

     // Selecting a file
     const selectImgBtn = useRef(null)
     const imgContainer = useRef(null)
     const [image, setImage] = useState(null)
     const [displayImg, setDisplayImg] = useState(false)
     const [passwordErr, setPasswordErr] = useState("")

    const checkPassword = ()=>{
        const lowerCasePattern = /[a-z]/g
        const upperCasePattern = /[A-Z]/g
        const specialChar = /[!@#$%^&*(),.?":{}|<>[\]\\/'`~_-]/g
        const digitPattern = /[0-9]/g
        
        if(!lowerCasePattern.test(userInfo.password)){
            setPasswordErr("Your password should contain atleast one lowercase letter")
            return false
        }else if(!upperCasePattern.test(userInfo.password)){
            setPasswordErr("Your password should contain atleast one uppercase letter")
            return false
        }else if(!specialChar.test(userInfo.password)){
            setPasswordErr("Your password should contain atleast one special character")
            return false
        }else if(!digitPattern.test(userInfo.password)){
            setPasswordErr("Your password should contain atleast one digit")
            return false
        }else if(userInfo.password.length < 8){
            setPasswordErr("Your password should contain atleast 8 characters")
            return false
        }else{
            setPasswordErr("")
            return true
        }

    }
    useEffect(()=>{
        if(userInfo.password.length >0){
            checkPassword()
        }else{
            setPasswordErr("")
        }
        
    }, [userInfo.password])

    const singUpFunc = (e) =>{
        e.preventDefault() 
        if(checkPassword()){
            const userData = {
                ...userInfo,
                "image": image
            }        

            axios.post(`${process.env.REACT_APP_API_URL}/signup`, userData, {
                withCredentials: true, // Send credentials (cookies)
                headers: {
                'Content-Type': 'application/json',
                //   Authorization: `Bearer ${sessionToken}`, // Include the session token in the Authorization header
                },
            })
            .then(res => {
                // Navigate to main
                setNavigateToHome(true)
            })
            .catch(err => {
                console.log(err); 
                setErrorMsg(err.response["data"])
                setTimeout(() => {
                    setErrorMsg((prev) => null)
                }, 2000);
            })
        }
    }
    const handleChange = (e) =>{
        setUserInfo({
            ...userInfo,
            [e.target.name] : e.target.value,
        })
    }
    
    // Selecting a file
    
    const addingImg = async (e) =>{
        console.log(e.target);
        const file = selectImgBtn.current.files[0]
        if(file){
            const reader = new FileReader();
            
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            selectImgBtn.current.textContent = "File selected"
            imgContainer.current.src =  URL.createObjectURL(file) 
            setDisplayImg(true)
        } 
    }
    const removePhoto = ()=>{
        setImage(null)
        imgContainer.current.src=""
        setDisplayImg(false)
    }
    
    return(
        <section className="min-h-screen bg-slate-300 flex items-center justify-center pb-4">
            <div className=" md:w-2/4 md:h-3/4 border-2 border-black rounded-md form-container">
                {navigateToHome && <Navigate to="/"/>}
                <h1 className="text-center text-5xl font-sans my-8">Sign up to SOMA</h1>
                <div className="h-6 ml-8 mb-2">
                    {errorMsg && <p className="text-red-600">{errorMsg}</p>}
                </div>
                
                <form onSubmit={singUpFunc}
                >
                    <div className="flex items-left flex-col mb-5 gap-2 mx-8 ">
                        <label htmlFor="username">Username</label>
                        <input id="username" className="block p-1 rounded-md" required 
                        name="username" type="text" onChange={handleChange} value={userInfo.username}/>
                    </div>
                    <div className="flex items-left flex-col mb-5 gap-2 mx-8 ">
                        <label htmlFor="current-password">Password</label>
                        <input id="current-password" className="block p-1 rounded-md"
                        name="password" type="password" onChange={handleChange}
                        min={8} required value={userInfo.password} />
                        <label htmlFor="" className="text-red-500">{passwordErr}</label>
                    </div>
                    <div className="flex items-left flex-col mb-5 gap-2 mx-8 ">
                        <label className="cursor-pointer bg-slate-100 
                        rounded-md inline-block w-44 p-2">
                            Add a profil picture
                            <input type="file" id="imageInput" onChange={addingImg} 
                            ref={selectImgBtn} accept="image/*" className="hidden"/>
                        </label>
                        <img id="imageContainer" ref={imgContainer} className="max-h-96 object-cover"></img>
                    </div>
                    {displayImg && <>
                        <button type="button" className="inline-block w-auto bg-gray-200 
                        text-red-600 ml-8 rounded-md" onClick={removePhoto}>
                            Remove
                        </button>
                    </>} 
                        
                    
                    <div className="mx-8 mb-5 mt-9">
                        Already have an account? 
                        <Link to={"/login"} className="inline-block text-orange-500 ml-2 
                        underline-offset-1 text-xl">Log in</Link>
                    </div>
                    <button type="submit" className="mx-8 text-2xl bg-gray-200 mb-3 rounded-md">
                        Sign Up
                    </button>
                </form>
            </div>
        </section>
        
    )
   
}

