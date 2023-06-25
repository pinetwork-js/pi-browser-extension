import { configUserAgent } from './config-user-agent';
import { setupNavigationUpdate } from './setup-navigation-update';
import { fixBlockchainButton } from './fix-blockchain-button';

export async function script() {
	if (window.self === window.top) {
		return;
	}

	if (window.parent !== window.top) {
		configUserAgent();

		return;
	}

	setupNavigationUpdate();

	if (window.location.href === 'https://app-cdn.minepi.com/mobile-app-ui/welcome/') {
		fixBlockchainButton();

		window.parent.postMessage({
			type: '@pi:browser:navigation_change',
			payload: {
				url: 'https://app-cdn.minepi.com/mobile-app-ui/welcome/',
			},
		});
	}
}
