import { setupBrowser } from './setup-browser';
import { browserConfig, loginConfig, setupConfig } from './setup-config';

export function script() {
	const userConfig = localStorage.getItem('@pi:webview_ui_behaviors');
	const token = localStorage.getItem('mobile-app-webview-ui_access-token');
	const loggedIn = localStorage.getItem('@pi:logged-in');

	if (!!token && userConfig !== JSON.stringify(browserConfig)) {
		setupConfig(browserConfig);
	} else if (!token && !loggedIn) {
		setupConfig(loginConfig);

		localStorage.setItem('@pi:logged-in', 'false');

		window.location.href = 'https://app-cdn.minepi.com/mobile-app-ui/node-signin';
	}

	if (window.location.href !== 'https://app-cdn.minepi.com/mobile-app-ui/node-signin' && loggedIn === 'false') {
		window.location.href = 'https://app-cdn.minepi.com/mobile-app-ui/node-signin';
	}

	if (token && loggedIn === 'false') {
		localStorage.setItem('@pi:logged-in', 'true');

		window.location.href = 'https://app-cdn.minepi.com/browser';
	}

	if (!window.location.href.startsWith('https://app-cdn.minepi.com/browser')) {
		return;
	}

	setupBrowser();
}
