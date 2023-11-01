import { configUserAgent } from '../config-user-agent';
import { overrideOpen } from '../override-open';

export function bottomIframe() {
	window.parent.postMessage({ type: '@pi:browser:pi-app-check' }, '*');

	window.addEventListener('message', (event) => {
		if (event.data.type === '@pi:browser:pi-app-detected') {
			configUserAgent();
			overrideOpen();
		}
	});
}
