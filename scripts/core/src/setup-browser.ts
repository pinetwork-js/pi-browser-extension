import { getUrlFromLink } from './get-url-from-link';
import { getAppUrl } from './get-app-url';
import { showUrl } from './show-url';
import { appRegex } from './transform-to-pi-url';
import { setupIframe } from './setup-iframe';
import { waitElement } from './wait-element';

export async function setupBrowser() {
	const root = await waitElement<HTMLElement>('#root');
	const linkUrl = getUrlFromLink();
	const appUrl = await getAppUrl(linkUrl);

	setupIframe(root, appUrl);

	const urlToShow = appRegex.test(appUrl) ? linkUrl : appUrl;

	showUrl(urlToShow);
}
