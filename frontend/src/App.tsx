import { useState } from 'react'
import { AuthForm, Logout } from './Auth.tsx'
import './App.css'

function App() {
  const [logged_in, setLoggedIn] = useState(false)

  function login(username: String, password: String) {
    const response = await fetch('/api/auth/token', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // TODO: Url encoding on stuff
      body: `username=${username}&password=${password}`
    });

    const json = response.json();

    
  }

  function login_handler(_formData: FormData) {
    const username = formData.get("username");
    const password = formData.get("password");
    login(username, password);
  }

  async function register_handler(formData: FormData) {
    const username = formData.get("username");
    const password = formData.get("password");
  
    const response = await fetch('/api/users/create', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'password': password,
      })
    });

    const json = await response.json();

    if (!response.ok) {
      const message = error["detail"];
      alert(message);
      return;
    }

    login(username, password);
  } 

  if (!logged_in) {
    return (
      <>
        <AuthForm onLogin={login_handler} onRegister={register_handler} />
      </>
    );
  } else {
    return (
      <>
        <Logout callback={() => setLoggedIn(false)}/>
      </>
    );
  }
}

export default App
