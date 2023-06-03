import { setupBrowser } from './setup-browser';
import { setupConfig } from './setup-config';

export function script() {
	if (!localStorage.getItem('@pi:webview_ui_behaviors')) {
		setupConfig();
	}

	if (window.location.href === 'https://app-cdn.minepi.com/mobile-app-ui/close.html') {
		window.location.href = 'https://app-cdn.minepi.com/mobile-app-ui/node-signin';
	}

	if (!window.location.href.startsWith('https://app-cdn.minepi.com/browser')) {
		return;
	}

	setupBrowser();
}
