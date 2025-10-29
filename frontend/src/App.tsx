import { useState } from 'react'
import { Login, Logout, Register } from './Auth.tsx'
import { Expandable } from './Helpers.tsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [logged_in, setLoggedIn] = useState(false)

  function login_handler() {
    
  }

  function register_handler() {
    
  }

  if (!logged_in) {
    return (
      <>
        <Expandable buttonText="Login">
          <Login />
        </Expandable>
        <br />
        <Expandable buttonText="Register">
          <Register />
        </Expandable>
      </>
    );
  } else {
    return (
      <>
        <Logout />
      </>
    );
  }
}

export default App
