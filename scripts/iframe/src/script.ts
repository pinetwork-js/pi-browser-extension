import { waitElement } from '@zero-dependency/dom';
import { configUserAgent } from './config-user-agent';
import { fixBlockchainButton } from './fix-blockchain-button';
import { fixGoBackButton } from './fix-go-back-button';
import { overrideOpen } from './override-open';
import { removeMenu } from './remove-menu';
import { setupNavigationUpdate } from './setup-navigation-update';

export async function script() {
	if (window.self === window.top) {
		return;
	}

	if (window.parent !== window.top) {
		document.addEventListener('DOMContentLoaded', () => configUserAgent(), {
			once: true,
		});

		overrideOpen();

		return;
	}

	if (window.origin !== 'https://app-cdn.minepi.com') {
		return;
	}

	const main = await waitElement<HTMLElement>('main');

	removeMenu(main);
	setupNavigationUpdate();
	fixGoBackButton();

	if (window.location.href === 'https://app-cdn.minepi.com/mobile-app-ui/welcome/') {
		fixBlockchainButton();
	}
}
