import { MessageType, type ResponseMessage } from '../messages';
import { navigateToUrl } from '../navigate-to-url';
import { showUrl } from '../show-url';

export function setupNavigationUpdate(iframe: HTMLIFrameElement) {
	iframe.addEventListener('load', () => {
		iframe.contentWindow?.postMessage({
			type: MessageType.INIT_NAVIGATION,
		});
	});

	window.addEventListener('message', (event: MessageEvent<ResponseMessage>) => {
		if (event.data.type === MessageType.NAVIGATION_CHANGE) {
			if (event.data.payload.navigate) {
				navigateToUrl(event.data.payload.url);
			}

			showUrl(event.data.payload.url, event.data.payload.action);
		}
	});
}
