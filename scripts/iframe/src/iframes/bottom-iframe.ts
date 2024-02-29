import { configUserAgent } from '../config-user-agent';
import { MessageType, type ResponseMessage } from '../messages';
import { overrideOpen } from '../override-open';

export function bottomIframe() {
	window.parent.postMessage({ type: '@pi:browser:pi-app-check' }, '*');

	window.addEventListener('message', (event: MessageEvent<ResponseMessage>) => {
		if (event.data.type === MessageType.PI_APP_DETECTED) {
			configUserAgent();
			overrideOpen();
		}
	});
}
