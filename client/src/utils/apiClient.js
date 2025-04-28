import axios from 'axios';

const apiClient = axios.create();

// request interceptor to add token to all requests
apiClient.interceptors.request.use(
	(config) => {
		// get the latest token on each request
		const token = localStorage.getItem('authToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export default apiClient;
