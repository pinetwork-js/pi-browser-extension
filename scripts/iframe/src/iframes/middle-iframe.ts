import { configUserAgent } from '../config-user-agent';
import { fixBlockchainButton } from '../fix-blockchain-button';
import { fixGoBackButton } from '../fix-go-back-button';
import { setupNavigationUpdate } from '../setup-navigation-update';

export function middleIframe() {
	if (window.origin !== 'https://app-cdn.minepi.com') {
		return;
	}

	window.addEventListener('message', (event) => {
		if (event.data.type === '@pi:browser:pi-app-detected') {
			const iframe = document.querySelector('iframe')?.contentWindow;

			iframe?.postMessage({ type: '@pi:browser:pi-app-detected' }, '*');
			return;
		}

		if (event.data.type === '@pi:browser:pi-app-check') {
			window.parent.postMessage({ type: '@pi:browser:pi-app-check' }, '*');
		}
	});

	configUserAgent();
	setupNavigationUpdate();
	fixGoBackButton();

	if (window.location.href === 'https://app-cdn.minepi.com/mobile-app-ui/welcome/') {
		fixBlockchainButton();
	}
}
