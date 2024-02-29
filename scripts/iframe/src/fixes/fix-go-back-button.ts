import { MessageType } from '../messages';

export function fixGoBackButton() {
	if (window.location.href === 'https://app-cdn.minepi.com/mobile-app-ui/welcome/') {
		window.parent.postMessage({
			type: MessageType.NAVIGATION_CHANGE,
			payload: {
				url: 'https://app-cdn.minepi.com/mobile-app-ui/welcome/',
			},
		});
	}

	if (window.location.href === 'https://app-cdn.minepi.com/mobile-app-ui/app/ecosystem') {
		window.parent.postMessage({
			type: MessageType.NAVIGATION_CHANGE,
			payload: {
				url: 'https://app-cdn.minepi.com/mobile-app-ui/app/ecosystem',
			},
		});
	}
}
