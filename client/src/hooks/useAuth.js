import { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';

export default function useAuth() {
	const [authState, setAuthState] = useState({
		isAuthenticated: false,
		user: null,
		isLoading: true,
		error: null
	});

	useEffect(() => {
		const verifyAuth = async () => {
			try {
				// checking if there's a token in the URL
				const urlParams = new URLSearchParams(window.location.search);
				const tokenFromUrl = urlParams.get('token');

				if (tokenFromUrl) {
					// if token present, save it to localStorage
					localStorage.setItem('authToken', tokenFromUrl);

					// clean URL by removing the token parameter
					const cleanUrl = window.location.pathname;
					window.history.replaceState({}, document.title, cleanUrl);
				}

				// check for token in localStorage
				const token = localStorage.getItem('authToken');

				if (!token) {
					setAuthState({
						isAuthenticated: false,
						user: null,
						isLoading: false,
						error: null
					});
					return;
				}

				// verify token with backend
				const response = await apiClient.get('/auth/verify-token');

				if (response.data.success) {
					setAuthState({
						isAuthenticated: true,
						user: response.data.user,
						isLoading: false,
						error: null
					});
				}
			} catch (error) {
				// token invalid or expired
				localStorage.removeItem('authToken');
				setAuthState({
					isAuthenticated: false,
					user: null,
					isLoading: false,
					error: 'Authentication failed'
				});

				console.error(error);
			}
		};

		verifyAuth();
	}, []);

	const logout = () => {
		localStorage.removeItem('authToken');
		setAuthState({
			isAuthenticated: false,
			user: null,
			isLoading: false,
			error: null
		});
	};

	return { ...authState, logout };
}
