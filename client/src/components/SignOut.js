 import React from 'react';
import { useHistory } from 'react-router-dom';

export default function SignOut() {
	let history = useHistory();

	function logOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('login');
		history.push('/');
	}

	return (
		<button type="button" class="btn btn-info" onClick={logOut}>Sign Out</button>

	);
}