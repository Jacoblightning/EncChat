import './Auth.css'

interface AuthProps {
	// Login callback
	onLogin: (formData: FormData) => void,
	// Register callback
	onRegister: (formData: FormData) => void,
}

export function AuthForm({onLogin, onRegister}: AuthProps) {
	return (
		<div className="auth">
		<form name="auth">
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
			
			<input type="submit" value="Login" formAction={onLogin} /> OR <input type="submit" value="Register" formAction={onRegister} />
		</form>
		</div>
	);
}

export function Logout({ callback }: { callback: React.MouseEventHandler<HTMLButtonElement> }) {
	return (
		<button type="button" onClick={callback}>Logout</button>
	);
}
