import React, {useState, useEffect, useRef} from 'react'

const PasswordValidator = ({password, correctPassword}) => {
    const patterns = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
    const [firstTime, setFirstTime] = useState(true)

    useEffect(()=>{
        if(password.length >0 || !firstTime){
            patterns.forEach(el=> el.current.style.display = "block")
            checkPassword()
        }else{
            firstTime && patterns.forEach(el=> el.current.style.display = "none")
            setFirstTime(false)
        }     
        
    }, [password])

    const checkPassword = ()=>{
        const patternText = [/[a-z]/g, /[A-Z]/g, /[!@#$%^&*(),.?":{}|<>[\]\\/'`~_-]/g, /[0-9]/g]
        let displayMsg = true
        patternText.forEach((element, index) =>{
            if(!element.test(password)){
                patterns[index].current.style.color = "red"
                displayMsg = false
            }else{
                patterns[index].current.style.color = "black"
            }
        })
        password.length < 8 ? (patterns[4].current.style.color = "red")
         :  patterns[4].current.style.color = "black"

        if(displayMsg){
            patterns.forEach(el => el.current.style.display = "none")
            correctPassword(true)
        }else{
            correctPassword(false)
        }
    }
  return (
    <div className="password--msg mx-8">
        <p ref={patterns[0]}>Your password should contain atleast one lowercase letter</p>
        <p ref={patterns[1]}>Your password should contain atleast one uppercase letter</p>
        <p ref={patterns[2]}>Your password should contain atleast one special character</p>
        <p ref={patterns[3]}>Your password should contain atleast one digit</p>
        <p ref={patterns[4]} className='mb-1'>Your password should contain atleast 8 characters</p>        
    </div>
  )
}

export default PasswordValidator
