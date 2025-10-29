
function AuthForm(onsubmit: Function, formname: String, submittext: String) {
	return (
		<form name={formname} onSubmit={onsubmit}>
			<label htmlFor="username">Username: </label>
			<br />
			<input type="text" name="username" id="username" required />

			<br />
			<br />
			
			<label htmlFor="password">Password: </label>
			<br />
			<input type="password" name="password" id="password" required />

			<br />
			<br />
			
			<input type="submit" value={submittext} /> 
		</form>
	);
}

export function Login({ callback }) {
	return AuthForm(callback, "login", "Login");
}

export function Register({ callback }) {
	return AuthForm(callback, "register", "Register");
}

export function Logout({ callback }) {
	return (
		<button onClick={callback}>Logout</button>
	);
}
