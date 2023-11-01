import { configUserAgent } from '../config-user-agent';

export function topIframe() {
	if (window.origin !== 'https://app-cdn.minepi.com') {
		return;
	}

	configUserAgent();

	window.addEventListener('message', (event) => {
		if (event.data.type === '@pi:browser:pi-app-check') {
			const iframe = document.querySelector('iframe')?.contentWindow;

			iframe?.postMessage({ type: '@pi:browser:pi-app-detected' }, '*');
		}
	});
}
