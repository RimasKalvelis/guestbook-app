const ChatFeed = ({ messageData }) => {
	return (
		<ul>
			{messageData &&
				messageData.map((data, index) => (
					<li className="chat-bubble" key={index}>
						<div className="sender">
							{data.sender}{' '}
							{data.webAddress && (
								<span>
									(
									<a
										className="web-address"
										href={data.webAddress}
										target="_blank"
										rel="noreferrer"
									>
										{data.webAddress}
									</a>
									)
								</span>
							)}
						</div>

						<div className="message">{data.message}</div>
						<div className="message-time">{data.dateSent}</div>
					</li>
				))}
		</ul>
	);
};

export default ChatFeed;
