export function send(this: XMLHttpRequest, body: Parameters<XMLHttpRequest['send']>[0]) {
	if (!body || typeof body !== 'string') {
		this.send(body);

		return;
	}

	try {
		const parsedBody = JSON.parse(body);

		if (parsedBody?.name?.startsWith('Navigate to')) {
			window.parent.postMessage({
				type: '@pi:browser:navigation_change',
				payload: {
					url: window.location.href.replace(parsedBody.data.fromRoute, parsedBody.data.toRoute),
				},
			});
		}
		/* eslint-disable-next-line no-empty */
	} catch {}

	this.send(body);
}
