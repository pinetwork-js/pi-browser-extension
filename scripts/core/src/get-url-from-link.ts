import { pages } from './transform-to-pi-url';

export function getUrlFromLink() {
	const url = new URL(window.location.href);
	const urlParameter = url.searchParams.get('url');

	return (urlParameter ?? pages.welcome).replace('pi://', 'https://');
}
