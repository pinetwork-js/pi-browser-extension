import { configUserAgent } from './config-user-agent';
import { setupNavigationUpdate } from './setup-navigation-update';
import { fixBlockchainButton } from './fix-blockchain-button';
import { overrideOpen } from './override-open';
import { fixGoBackButton } from './fix-go-back-button';

export async function script() {
	if (window.self === window.top) {
		return;
	}

	if (window.parent !== window.top) {
		configUserAgent();
		overrideOpen();

		return;
	}

	setupNavigationUpdate();
	fixGoBackButton();

	if (window.location.href === 'https://app-cdn.minepi.com/mobile-app-ui/welcome/') {
		fixBlockchainButton();
	}
}
