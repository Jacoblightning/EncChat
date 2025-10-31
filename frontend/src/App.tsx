import { useState } from 'react'
import { AuthForm, Logout } from './Auth.tsx'
import Chat from './Chat.tsx'
//import './App.css'

function App() {
  type AuthStateType =
    | { logged_in: false }
    | { logged_in: true, token: string };
  
  const [authState, setAuthState] = useState<AuthStateType>({ logged_in: false });

  async function login(username: string, password: string) {
    const encoded_username = encodeURIComponent(username);
    const encoded_password = encodeURIComponent(password);
    const response = await fetch('/api/auth/token', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      
      body: `username=${encoded_username}&password=${encoded_password}`
    });

    const json = await response.json();

    if (!response.ok) {
      const message = json["detail"];
      alert(message);
      return;
    }

    const token = json["access_token"];

    console.assert(json["token_type"] === "bearer", "Token type was not bearer");

    setAuthState({ logged_in: true, token: token });
  }

  async function login_handler(formData: FormData) {
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === null || password === null || typeof username !== "string" || typeof password !== "string") {
      alert("Something went wrong.");
      return;
    }

    await login(username, password);
  }

  async function register_handler(formData: FormData) {
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === null || password === null || typeof username !== "string" || typeof password !== "string") {
      alert("Something went wrong.");
      return;
    }
  
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
      const message = json["detail"];
      alert(message);
      return;
    }

    await login(username, password);
  } 

  if (!authState.logged_in) {
    return (
      <>
        <AuthForm onLogin={login_handler} onRegister={register_handler} />
      </>
    );
  } else {
    return (
      <>
        <Logout callback={() => setAuthState({ logged_in: false })}/>
        <Chat token={authState.token} />
      </>
    );
  }
}

export default App
