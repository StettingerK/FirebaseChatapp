import React, {useState, useRef} from 'react';
import './loginRegisterStyle.scss';
import ImageImport from '../img/ImageImport.png';
import {Link, useNavigate} from 'react-router-dom';
import {sha256} from 'crypto-hash';
import { red } from '@mui/material/colors';

const Register = () => {
  const [sendButtonActive, setSendButtonActive] = useState(false);
  const [userCreated, setUserCrated] = useState();
  const navigate = useNavigate();
  /*
    const [getUser, setUser] = useState();
    const [getPassword1, setPassword1] = useState();
    const [getPassword2, setPassword2] = useState();
*/
   // document.getElementById("submitButton").disabled = (pasword1Ref === pasword2Ref? false : true);
   
   const userRef = useRef( );
   const pasword1Ref = useRef( );
   const pasword2Ref = useRef( );
   /*
   const handleSubmit = (event) =>{
        //console.log(sha256(getUser));
        //console.log(sha256(getPassword1));
        //console.log(sha256(getPassword2));
        event.preventDefault();
        const user = userRef.current.value;
        const pw1 = pasword1Ref.current.value;
        const pw2 = pasword2Ref.current.value;
        //console.log(sha256(user));
        //console.log(sha256(pw1));
        //console.log(sha256(pw2));
    */


    async function onSubmit(e) {
      e.preventDefault()
      const postData = {
        userName: userRef.current.value,
        password: pasword1Ref.current.value
      }
      try {
          const res = await fetch('/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },    
          body: JSON.stringify(postData)
          })

          const data = await res.json()
          if(data){
            alert('Successfully registered! Please log in to continue')
            setUserCrated(data);  
            console.log("user Created");
            navigate("/Login");
          } else {
            //alert('Username already exists');
            setUserCrated(data);
            console.log("user already exists");
          }
      } catch (error) {
          console.error('Error:', error);
      }
    }

    const validateSendButton = () => {
      if(((pasword1Ref.current.value === pasword2Ref.current.value) && pasword1Ref !== "" && pasword1Ref.current.value.length >= 8 && userRef.current.value >= 1) !== sendButtonActive){
        setSendButtonActive(!sendButtonActive);
      }
    };

    return (
    <div className='container'>
        <div className='wrapper'>
            <span className='logo'>Chatapp</span>
            <span className='title'>Registrierung</span>
            <form onSubmit={onSubmit}>
                <input type="text" name='user' placeholder="Benutzername" ref={userRef} onChange={validateSendButton}/>
                <input type="password" name='password1' placeholder="Passwort min. 8 Zeichen" ref={pasword1Ref} onChange={validateSendButton}/>
                <input type="password" name='password2' placeholder="Passwort erneut min. 8 Zeichen" ref={pasword2Ref} onChange={validateSendButton}/>
                <input style={{display:"none"}} type="file" id="file"/>
                {/*<label htmlFor='file'>
                    <img src={ImageImport} alt=''/>
                    <span>gibt ein Profilfoto an</span>
                </label>*/}
                {userCreated === false ? <p style={{color:'red'}}>Benutzername ist schon verwendet</p>:""}
                <button type='submit' disabled={!sendButtonActive}>Registrieren</button> 
            </form>
            <p>Du hast schon einen Account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register