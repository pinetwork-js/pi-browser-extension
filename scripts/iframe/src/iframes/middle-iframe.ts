import { configUserAgent } from '../config-user-agent';
import { fixBlockchainButton } from '../fix-blockchain-button';
import { fixGoBackButton } from '../fix-go-back-button';
import { MessageType } from '../messages/message-type';
import type { ResponseMessage } from '../messages/response-message';
import { setupNavigationUpdate } from '../setup-navigation-update';

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
