import { configUserAgent } from './config-user-agent';
import { setupNavigationUpdate } from './setup-navigation-update';

export function script() {
	if (window.self === window.top) {
		return;
	}

	if (window.parent !== window.top) {
		configUserAgent();

		return;
	}

	setupNavigationUpdate();
}
