export function configUserAgent() {
	const userAgentProperty = {
		get: () =>
			'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.88 Mobile Safari/537.36 PiBrowser/1.11.0',
	};
	const vendorProperty = {
		get: () => 'Google Inc.',
	};

	try {
		Object.defineProperty(window.navigator, 'userAgent', userAgentProperty);
		Object.defineProperty(window.navigator, 'vendor', vendorProperty);
	} catch {
		console.log('Failed to override user agent');
	}
}
