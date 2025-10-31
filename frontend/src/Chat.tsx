import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import './Chat.css'

export default function Chat({ token }: { token: string }) {
	const url = new URL(`/api/chat/ws?token=${token}`, location.href);
	url.protocol = "ws:";
	const socketUrl = url.href;

	const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([]);

	const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);


	useEffect(() => {
	  if (lastMessage !== null) {
	  	console.log(messageHistory);
	    setMessageHistory((prev) => prev.concat(lastMessage));
	  }
	}, [lastMessage]);

	function send() {
		const message_field = document.getElementById("message_field") as HTMLInputElement;
		const message = message_field?.value;

		if (message === null || message_field === null) {
			return;
		}
		
		sendMessage(message);
		message_field.value = "";
	}

	const connectionStatus = {
	    [ReadyState.CONNECTING]: 'Connecting ...',
	    [ReadyState.OPEN]: 'Open :)',
	    [ReadyState.CLOSING]: 'Closing :(',
	    [ReadyState.CLOSED]: 'Closed :(',
	    [ReadyState.UNINSTANTIATED]: 'Uninstantiated ???',
	  }[readyState];

	return (
	  <>
	  <span className="ws_status">The WebSocket is currently {connectionStatus}</span>
	  <div className="chatcontrol">
		  <div className="chat">
		    <br />
		    <ul>
		      {messageHistory.map((message, idx) => (
		      	<>
		        <span key={idx}>{message ? message.data : null}</span>
		        <br />
		        </>
		      ))}
		    </ul>
		  </div>
		  <div className="controls">
		  	<input type="text" className="message" id="message_field" onKeyUp={(e) => {
		  		if (e.key == "Enter") send()
		  	}}/>
		  	<button type="button" className="send" onClick={send}>Send</button>
		  </div>
	  </div>
	  </>
	);
};
