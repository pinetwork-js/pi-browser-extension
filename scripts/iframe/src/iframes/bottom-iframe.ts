import { configUserAgent } from '../config-user-agent';
import { MessageType, type ResponseMessage } from '../messages';
import { overrideOpen } from '../override-open';

export function bottomIframe() {
	window.parent.postMessage({ type: MessageType.PI_APP_CHECK }, '*');

	window.addEventListener('message', (event: MessageEvent<ResponseMessage>) => {
		if (event.data.type === MessageType.PI_APP_DETECTED) {
			configUserAgent();
			overrideOpen();
		}
	});
}
