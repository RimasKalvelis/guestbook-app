import { useEffect, useReducer, useState } from 'react';
import { formReducer, INITIAL_STATE } from '../formReducer';
import ChatFeed from './ChatFeed';

const ChatWindow = () => {
	const [messageData, setMessageData] = useState([]);
	const [error, setError] = useState(false);

	const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

	const handleInputChange = (e) => {
		dispatch({
			type: 'INPUT_CHANGE',
			payload: { name: e.target.name, value: e.target.value },
		});
	};

	const getAllMessages = () => {
		fetch(`http://localhost:3001?query=query {
			allMessages {
			  id
			  sender
			  webAddress
			  message
			  dateSent
			}
		  }
		`)
			.then((response) => response.json())
			.then((data) => {
				setMessageData(data.data.allMessages);
			})
			.catch((err) => {
				console.log(err);
				setError(true);
			});
	};

	const postNewMessage = (sender, webAddress, messageText) => {
		fetch(
			`http://localhost:3001?query=mutation {
			createMessage (
				sender: "${sender}",
				webAddress: "${webAddress}",
				message: "${messageText}",
				dateSent: "${new Date().toLocaleString('en-uk')}"
			){
			  id
			  sender
			  webAddress
			  message
			  dateSent
			}
		  }`,
			{ method: 'POST' }
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (state.sender && state.messageText) {
			postNewMessage(state.sender, state.webAddress, state.messageText);
			getAllMessages();

			dispatch({
				type: 'INPUT_CHANGE',
				payload: { name: 'messageText' },
			});
		}
	};

	useEffect(() => {
		getAllMessages();
	}, []);

	return (
		<div className="chat-window">
			<ChatFeed messageData={messageData} />

			<span>{error && 'Something went wrong'}</span>
			<button className="fetch-messages" onClick={getAllMessages}>
				Fetch messages
			</button>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="sender">
						Sender name <span className="required">*</span>:{' '}
					</label>
					<input
						type="text"
						name="sender"
						value={state.sender}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					<label htmlFor="webAddress">Web address: </label>
					<input
						type="text"
						name="webAddress"
						value={state.webAddress}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					<label htmlFor="messageText">
						Message <span className="required">*</span>:{' '}
					</label>
					<textarea
						type="text"
						name="messageText"
						value={state.messageText}
						onChange={handleInputChange}
					/>
				</div>

				<button type="submit">Send message</button>
			</form>
		</div>
	);
};

export default ChatWindow;
