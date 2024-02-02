import React, {useState, useRef} from 'react';
import './loginRegisterStyle.scss';
import {Link, useNavigate} from 'react-router-dom';

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

        const data = await res.json()
        if(data){
          setUserLogedIn(data);  
          console.log("user Loged in");
          navigate("/Login");
        } else {
          setUserLogedIn(data);
          console.log("user doesnt exist");
        }
    } catch (error) {
        console.error('Error:', error);
    }
  } 

  return (
    <div className='container'>
        <div className='wrapper'>
            <span className='logo'>Chatapp</span>
            <span className='title'>Login</span>
            <form>
                <input type="text" placeholder="Benutzername"/>
                <input type="password" placeholder="Passwort"/>
                {userLogedIn === false ? <p style={{color:'red'}}>Benutzername oder Password falsch</p>:""}
                <button type='submit' disabled={!sendButtonActive}>Anmelden</button>
            </form>
            <p>Du hast noch keinen einen Account? <Link to="/register">Registrierung</Link></p>
        </div>
    </div>
  )
}

export default Login