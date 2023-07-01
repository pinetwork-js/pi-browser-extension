import { waitElement } from '@zero-dependency/dom';
import { configUserAgent } from './config-user-agent';
import { fixBlockchainButton } from './fix-blockchain-button';
import { fixGoBackButton } from './fix-go-back-button';
import { overrideOpen } from './override-open';
import { removeMenu } from './remove-menu';
import { setupNavigationUpdate } from './setup-navigation-update';

export async function script() {
	if (window.self === window.top) {
		configUserAgent();

		return;
	}

	if (window.parent !== window.top) {
		configUserAgent();
		overrideOpen();

		return;
	}

	if (window.origin !== 'https://app-cdn.minepi.com') {
		return;
	}

	configUserAgent();
	setupNavigationUpdate();

	const main = await waitElement<HTMLElement>('main');

	removeMenu(main);
	fixGoBackButton();

	if (window.location.href === 'https://app-cdn.minepi.com/mobile-app-ui/welcome/') {
		fixBlockchainButton();
	}
}
