import React, {useState, useRef} from 'react';
import './loginRegisterStyle.scss';
import {Link, useNavigate} from 'react-router-dom';
import Session from 'react-session-api'

const Login = () => {
  const [sendButtonActive, setSendButtonActive] = useState(false);
  const [userLogedIn, setUserLogedIn] = useState();
  const navigate = useNavigate();

  const userRef = useRef( );
  const paswordRef = useRef( );

  async function onSubmit(e) {
    e.preventDefault()
    const postData = {
      userName: userRef.current.value,
      password: paswordRef.current.value
    }
    try {
        const res = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },    
        body: JSON.stringify(postData)
        })

        const data = await res.json();
        if(data !== "Invalid Credentials"){
          setUserLogedIn(true);  
          console.log("user Loged in");
          Session.set('UserId', data[0]);
          Session.set('UserName', data[1]);
          navigate("/app");
        } else {
          setUserLogedIn(false);
          console.log("user doesnt exist");
        }
    } catch (error) {
        console.error('Error:', error);
    }
  } 

  const validateSendButton = () =>{
    if((paswordRef.current.value.length >= 8 && userRef.current.value.length >= 1) !== sendButtonActive){
      setSendButtonActive(!sendButtonActive);
    }
  }

  return (
    <div className='container'>
        <div className='wrapper'>
            <span className='logo'>Chatapp</span>
            <span className='title'>Login</span>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Benutzername" ref={userRef} onChange={validateSendButton}/>
                <input type="password" placeholder="Passwort min. 8 Zeichen" ref={paswordRef} onChange={validateSendButton}/>
                {userLogedIn === false ? <p style={{color:'red'}}>Benutzername oder Password falsch</p>:""}
                <button type='submit' disabled={!sendButtonActive}>Anmelden</button>
            </form>
            <p>Du hast noch keinen Account? <Link to="/register">Registrierung</Link></p>
        </div>
    </div>
  )
}

export default Login