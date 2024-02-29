import { configUserAgent } from '../config-user-agent';
import { MessageType } from '../messages/message-type';
import type { ResponseMessage } from '../messages/response-message';
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
