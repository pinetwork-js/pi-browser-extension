import { bottomIframe, middleIframe, topIframe } from './iframes';

export async function script() {
	if (window.self === window.top) {
		topIframe();

		return;
	}

	if (window.parent !== window.top) {
		bottomIframe();

		return;
	}

	middleIframe();
}
