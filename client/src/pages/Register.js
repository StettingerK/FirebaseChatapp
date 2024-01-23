import React, {useState, useRef} from 'react';
import './loginRegisterStyle.scss';
import ImageImport from '../img/ImageImport.png';
import {Link} from 'react-router-dom';
import {sha256} from 'crypto-hash';

const Register = () => {
    /*
    const [getUser, setUser] = useState();
    const [getPassword1, setPassword1] = useState();
    const [getPassword2, setPassword2] = useState();
    */

    const userRef = useRef();
    const pasword1Ref = useRef();
    const pasword2Ref = useRef();
    

    const handleSubmit = (event) =>{
        //console.log(sha256(getUser));
        //console.log(sha256(getPassword1));
        //console.log(sha256(getPassword2));
        event.preventDefault();
        const user = userRef.current.value;
        const pw1 = pasword1Ref.current.value;
        const pw2 = pasword2Ref.current.value;
        console.log(sha256(user));
        console.log(sha256(pw1));
        console.log(sha256(pw2));


    }

    return (
    <div className='container'>
        <div className='wrapper'>
            <span className='logo'>Chatapp</span>
            <span className='title'>Registrierung</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Benutzername" ref={userRef}/>
                <input type="password" placeholder="Passwort" ref={pasword1Ref}/>
                <input type="password" placeholder="Passwort erneut" ref={pasword2Ref}/>
                <input style={{display:"none"}} type="file" id="file"/>
                <label htmlFor='file'>
                    <img src={ImageImport} alt=''/>
                    <span>gibt ein Profilfoto an</span>
                </label>
                <button type='submit'>Registrieren</button>
            </form>
            <p>Du hast schon einen Account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register