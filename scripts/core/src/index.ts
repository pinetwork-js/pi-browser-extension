import { domReady } from '@zero-dependency/dom';
import { setupConfig } from './setup-config';
import { setupBrowser } from './setup-browser';

/* eslint-disable-next-line unicorn/prefer-top-level-await */
domReady().then(() => {
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
});
