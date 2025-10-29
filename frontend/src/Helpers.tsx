import { useState } from 'react'

export function Expandable({ buttonText, children }) {
	const [expanded, setExpanded] = useState(false);
	
	return (
		<>
			{ !expanded ? (
				<button onClick={() => setExpanded(true)}>{buttonText}</button>
			) : (
				children
			)}
		</>
	);
}
