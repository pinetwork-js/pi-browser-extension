export function overrideOpen() {
	window.open = (url?: URL | string) => {
		if (!url) {
			return window;
		}

		const stringUrl = typeof url === 'string' ? url : url.toString();

		window.parent.postMessage(
			{
				type: '@pi:browser:navigation_change',
				payload: {
					url: stringUrl,
				},
			},
			'*',
		);

		return window;
	};
}
