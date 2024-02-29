interface ResolvedURL {
	display_url: string;
	redirect_url: string;
	resolved_url: string;
	time_to_live: number;
	trusted: boolean;
}

export async function getAppUrl(url: string) {
	const userToken = localStorage.getItem('mobile-app-webview-ui_access-token');

	if (!userToken) {
		return url;
	}

	const appHostname = new URL(url).hostname;
	const appRequest = await fetch(`https://socialchain.app/api/mobile_app/resolved_url?q=${appHostname}`, {
		headers: { Authorization: userToken },
	}).catch();
	const appData = (await appRequest.json()) as ResolvedURL;

	return appData.redirect_url ? appData.redirect_url.replace('http://', 'https://') + new URL(url).pathname : url;
}
