import { useState } from 'react'
import { AuthForm, Logout } from './Auth.tsx'
import './App.css'

function App() {
  const [logged_in, setLoggedIn] = useState(false)

  function login_handler(_formData: FormData) {
    alert("Login Called");
  }

  async function register_handler(formData: FormData) {
    const response = await fetch('/api/users/create', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': formData.get("username"),
        'password': formData.get("password"),
      })
    });

    if (!response.ok) {
      const error = await response.json();
      const message = error["detail"];
      alert(message);
    }
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
