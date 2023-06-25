import { fixBlockchainButton } from './fix-blockchain-button';
import { setupHistoryProxy } from './setup-history-proxy';

export function setupNavigationUpdate() {
	window.addEventListener('message', (event) => {
		if (event.data.type === '@pi:browser:init_navigation') {
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

		if (event.data.type === '@pi:browser:navigation_change') {
			window.parent.postMessage(event.data);
		}
	});
}
