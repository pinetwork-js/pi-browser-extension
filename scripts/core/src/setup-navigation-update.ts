import { showUrl } from './show-url';

export function setupNavigationUpdate(iframe: HTMLIFrameElement) {
	iframe.addEventListener('load', () => {
		iframe.contentWindow?.postMessage({
			type: '@pi:browser:init_navigation',
		});
	});

	window.addEventListener('message', (event) => {
		if (event.data.type === '@pi:browser:navigation_change') {
			showUrl(event.data.payload.url);
		}
	});
}
