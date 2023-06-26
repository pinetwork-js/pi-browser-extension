import { fixBlockchainButton } from './fix-blockchain-button';
import { getAppUrl } from './get-app-url';
import { setupHistoryProxy } from './setup-history-proxy';

let superposeDisplayUrl = false;

export function setupNavigationUpdate() {
	window.addEventListener('message', (event) => {
		let eventData;

		try {
			eventData = JSON.parse(event.data);
		} catch {
			eventData = event.data;
		}

		if (eventData.type === '@pi:browser:init_navigation') {
			window.addEventListener('locationchange', () => {
				if (window.location.href === 'https://app-cdn.minepi.com/mobile-app-ui/welcome/') {
					fixBlockchainButton();
				}

				window.parent.postMessage({
					type: '@pi:browser:navigation_change',
					payload: {
						url: window.location.href,
					},
				});
			});

			setupHistoryProxy();
		}

		if (eventData.type === '@pi:browser:navigation_change') {
			getAppUrl(eventData.payload.url).then((appUrl) => {
				window.location.href = appUrl;
			});

			window.parent.postMessage(eventData);
		}

		if (eventData.type === '@pi:messaging:superposeDisplayUrl') {
			window.parent.postMessage({
				type: '@pi:browser:navigation_change',
				payload: {
					url: eventData.payload.url,
					action: 'push',
				},
			});

			superposeDisplayUrl = true;
		}

		if (eventData.type === '@pi:messaging:endSuperposeDisplayUrl' && superposeDisplayUrl) {
			window.parent.postMessage({
				type: '@pi:browser:navigation_change',
				payload: {
					action: 'pop',
				},
			});

			superposeDisplayUrl = false;
		}
	});
}
