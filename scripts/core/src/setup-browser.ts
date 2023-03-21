import { waitElement } from '@zero-dependency/dom';
import { removeMenu } from './remove-menu';
import { getUrlFromLink } from './get-url-from-link';
import { getAppUrl } from './get-app-url';
import { showUrl } from './show-url';
import { appRegex } from './transform-to-pi-url';
import { setupIframe } from './setup-iframe';

export async function setupBrowser() {
	const main = await waitElement<HTMLElement>('main');

	removeMenu(main);

	const linkUrl = getUrlFromLink();
	const appUrl = await getAppUrl(linkUrl);

	setupIframe(main, appUrl);

	const urlToShow = appRegex.test(appUrl) ? linkUrl : appUrl;

	showUrl(urlToShow);
}
