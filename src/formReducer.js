export const INITIAL_STATE = {
	sender: '',
	webAddress: '',
	messageText: '',
};

export const formReducer = (state, action) => {
	switch (action.type) {
		case 'INPUT_CHANGE':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};
		case 'SEND_MESSAGE':
			return { ...state, [action.payload.name]: '' };
		default:
			return state;
	}
};
