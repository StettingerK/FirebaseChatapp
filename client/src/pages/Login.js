import React from 'react';
import './loginRegisterStyle.scss';
import {Link} from 'react-router-dom';

const Login = () => {
  return (
    <div className='container'>
        <div className='wrapper'>
            <span className='logo'>Chatapp</span>
            <span className='title'>Login</span>
            <form>
                <input type="text" placeholder="Benutzername"/>
                <input type="password" placeholder="Passwort"/>
                <button>Anmelden</button>
            </form>
            <p>Du hast noch keinen einen Account? <Link to="/register">Registrierung</Link></p>
        </div>
    </div>
  )
}

export default Login