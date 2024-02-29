import { fixBlockchainButton } from '../fixes';
import { getAppUrl } from '../get-app-url';
import { MessageType, type ResponseMessage } from '../messages';
import { setupHistoryProxy } from './setup-history-proxy';

let superposeDisplayUrl = false;

export function setupNavigationUpdate() {
	window.addEventListener('message', (event: MessageEvent<ResponseMessage>) => {
		let eventData: ResponseMessage;

		try {
			eventData = JSON.parse(event.data as unknown as string) as ResponseMessage;
		} catch {
			eventData = event.data;
		}

		if (eventData.type === MessageType.INIT_NAVIGATION) {
			window.addEventListener('locationchange', () => {
				if (window.location.href === 'https://app-cdn.minepi.com/mobile-app-ui/welcome/') {
					fixBlockchainButton();
				}

				window.parent.postMessage({
					type: MessageType.NAVIGATION_CHANGE,
					payload: {
						url: window.location.href,
					},
				});
			});

			setupHistoryProxy();
		}

		if (eventData.type === MessageType.NAVIGATION_CHANGE) {
			getAppUrl(eventData.payload.url).then((appUrl) => {
				window.location.href = appUrl;
			});

			window.parent.postMessage(eventData);
		}

		if (eventData.type === MessageType.SUPERPOSE_DISPLAY_URL) {
			window.parent.postMessage({
				type: MessageType.NAVIGATION_CHANGE,
				payload: {
					url: eventData.payload.url,
					action: 'push',
				},
			});

			superposeDisplayUrl = true;
		}

		if (eventData.type === MessageType.END_SUPERPOSE_DISPLAY_URL && superposeDisplayUrl) {
			window.parent.postMessage({
				type: MessageType.NAVIGATION_CHANGE,
				payload: {
					action: 'pop',
				},
			});

			superposeDisplayUrl = false;
		}
	});
}
