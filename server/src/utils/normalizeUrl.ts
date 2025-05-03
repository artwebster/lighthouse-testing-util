export const normalizeUrl = (inputUrl: string): string => {
	try {
		const url = new URL(inputUrl);

		// only allow http/https
		const allowedProtocols = ['http:', 'https:'];
		if (!allowedProtocols.includes(url.protocol)) {
			throw new Error('Invalid URL protocol');
		}

		// lowercase hostname, remove trailing slash from pathname
		url.hostname = url.hostname.toLowerCase();
		url.pathname = url.pathname.replace(/\/$/, '');

		// remove default ports
		if ((url.protocol === 'http:' && url.port === '80') || (url.protocol === 'https:' && url.port === '443')) {
			url.port = '';
		}

		return url.toString();
	} catch (e) {
		throw new Error('Invalid URL: ' + e);
	}
};
