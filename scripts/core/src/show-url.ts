import { transformToPiURL } from './transform-to-pi-url';

export function showUrl(url?: string, action: 'pop' | 'push' | 'replace' = 'replace') {
	const newUrlToShow = url ? transformToPiURL(url) : '';

	switch (action) {
		case 'push': {
			window.history.pushState({}, '', `/browser?url=${newUrlToShow}`);

			break;
		}

		case 'pop': {
			window.history.back();

			break;
		}

		case 'replace': {
			window.history.replaceState({}, '', `/browser?url=${newUrlToShow}`);

			break;
		}

		default:
	}
}
