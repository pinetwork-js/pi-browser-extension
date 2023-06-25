export function navigateToUrl(url: string) {
	const iframe = document.querySelector('iframe');

	if (!iframe) {
		return;
	}

	iframe.src = url;
}
