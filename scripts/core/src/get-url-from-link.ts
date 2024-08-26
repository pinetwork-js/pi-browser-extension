import { pages } from './transform-to-pi-url';

export function getUrlFromLink() {
	const url = new URL(window.location.href);
	const urlParameter = url.searchParams.get('url');

	if (!urlParameter) {
		return `https://${pages.home}`;
	}

	if (!urlParameter.startsWith('pi://') && !urlParameter.startsWith('https://')) {
		return `https://${urlParameter}`;
	}

	return urlParameter.replace('pi://', 'https://');
}
