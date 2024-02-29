import { configUserAgent } from '../config-user-agent';
import { fixGoBackButton, fixBlockchainButton } from '../fixes';
import { MessageType, type ResponseMessage } from '../messages';
import { setupNavigationUpdate } from '../setup';

export function middleIframe() {
	if (window.origin !== 'https://app-cdn.minepi.com') {
		return;
	}

	window.addEventListener('message', (event: MessageEvent<ResponseMessage>) => {
		if (event.data.type === MessageType.PI_APP_DETECTED) {
			const iframe = document.querySelector('iframe')?.contentWindow;

			iframe?.postMessage({ type: MessageType.PI_APP_DETECTED }, '*');
			return;
		}

		if (event.data.type === MessageType.PI_APP_CHECK) {
			window.parent.postMessage({ type: MessageType.PI_APP_CHECK }, '*');
		}
	});

	configUserAgent();
	setupNavigationUpdate();
	fixGoBackButton();

	if (window.location.href === 'https://app-cdn.minepi.com/mobile-app-ui/welcome/') {
		fixBlockchainButton();
	}
}
