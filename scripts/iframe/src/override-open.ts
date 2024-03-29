import { MessageType } from './messages';

export function overrideOpen() {
	window.open = (url?: URL | string) => {
		if (!url) {
			return window;
		}

		const stringUrl = typeof url === 'string' ? url : url.toString();

		window.parent.postMessage(
			{
				type: MessageType.NAVIGATION_CHANGE,
				payload: {
					url: stringUrl,
				},
			},
			'*',
		);

		return window;
	};
}
