import { transformToPiURL } from './transform-to-pi-url';

export function showUrl(url: string) {
	const newUrlToShow = transformToPiURL(url);

	window.history.replaceState({}, '', `/browser?url=${newUrlToShow}`);
}
