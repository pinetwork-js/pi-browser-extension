import { configUserAgent } from '../config-user-agent';
import { MessageType, type ResponseMessage } from '../messages';

export function topIframe() {
	if (window.origin !== 'https://app-cdn.minepi.com') {
		return;
	}

	configUserAgent();

	window.addEventListener('message', (event: MessageEvent<ResponseMessage>) => {
		if (event.data.type === MessageType.PI_APP_CHECK) {
			const iframe = document.querySelector('iframe')?.contentWindow;

			iframe?.postMessage({ type: MessageType.PI_APP_DETECTED }, '*');
		}
	});
}
