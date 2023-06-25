import { navigateToUrl } from './navigate-to-url';
import { showUrl } from './show-url';

export function setupNavigationUpdate(iframe: HTMLIFrameElement) {
	iframe.addEventListener('load', () => {
		iframe.contentWindow?.postMessage({
			type: '@pi:browser:init_navigation',
		});
	});

	window.addEventListener('message', (event) => {
		if (event.data.type === '@pi:browser:navigation_change') {
			if (event.data.payload.navigate) {
				navigateToUrl(event.data.payload.url);
			}

			showUrl(event.data.payload.url, event.data.payload.action);
		}
	});
}
