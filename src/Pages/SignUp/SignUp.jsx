import React, {useState, useRef} from "react";
import axios from "axios";
import { CurrentUserContext } from "../../App";
import { Navigate, Link } from "react-router-dom";
import "./signup.css"
import PasswordValidator from "../../Components/PasswordValidator/PasswordValidator";


export const SingUp = () =>{
      
    const [userInfo, setUserInfo] = useState({"username": "", "password": ""})
    const [errorMsg, setErrorMsg] = useState(null)
    const [navigateToHome, setNavigateToHome] = useState(false)
    const singupBtn = useRef(null)

     // Selecting a file
     const selectImgBtn = useRef(null)
     const imgContainer = useRef(null)
     const [image, setImage] = useState(null)
     const [displayImg, setDisplayImg] = useState(false)
     const [passwordErr, setPasswordErr] = useState(false)

    const checkPassword = (value) =>{        
        setPasswordErr(value)
    }
    
 
    const singUpFunc = (e) =>{
        e.preventDefault() 
        if(passwordErr){
            singupBtn.current.style.cursor = "not-allowed"
            singupBtn.current.disabled = true
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
                singupBtn.current.style.cursor = "pointer"
                singupBtn.current.disabled = false
                setNavigateToHome(true)
            })
            .catch(err => {
                singupBtn.current.style.cursor = "pointer"
                singupBtn.current.disabled = false 
                err.response ? setErrorMsg(err.response["data"]) : setErrorMsg(err.message)
                setTimeout(() => {
                    setErrorMsg((prev) => null)
                }, 2000);
            })
        }else{
            setErrorMsg("Invalid Password")
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
                <h1 className="text-center text-5xl font-sans mt-8">Sign up to SOMA</h1>
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
                    </div>
                    <PasswordValidator password={userInfo.password} correctPassword={checkPassword}/>
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
                    <button type="submit" className="mx-8 text-2xl bg-gray-200 mb-3 rounded-md" ref={singupBtn}>
                        Sign Up
                    </button>
                </form>
            </div>
        </section>
        
    )
   
}

