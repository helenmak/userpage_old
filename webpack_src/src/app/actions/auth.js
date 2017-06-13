import socket from 'app/util/websockets';

export const authFormShow = () => {
	return {
		type: 'LOGIN_FORM_SHOW'
	}
}

export const authFormHide = () => {
	return {
		type: 'LOGIN_FORM_HIDE'
	}
}

export const authSuccess = (user) => {
	return {
		type: 'AUTH_SUCCESS',
		payload: user
	}
}

export const authLogout = () => {
	return {
		type: 'LOGOUT'
	}
}

export const fetchMyUserData = () => {
	return (dispatch) => {

		return new Promise((res, rej) => {
			const handler = (response) => { res(dispatch(authSuccess(response.data.user))) }
			socket.once('/api/user/', handler);
			socket.emit('/api/user/', { param: 'me' });
			const timer = setTimeout(() => { socket.off('/api/user/', handler); rej() }, 5000);
		})
	}
}