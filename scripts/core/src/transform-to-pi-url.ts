export const appRegex =
	/^(?:pi|https):\/\/app-cdn\.minepi\.com\/mobile-app-ui\/app\/(.*?)(?:$|\/)|^(?:(?:pi|https):\/\/|)(.*?)\.pinet\.com/;
const apps: Record<string, string> = {
	brainstorm: 'brainstorm.pinet.com',
	kyc: 'kyc.pinet.com',
	devportal: 'develop.pinet.com',
	translate: 'pi://translate.pi',
	'platform-demo-app': 'pi://demo.pi',
	ecosystem: 'ecosystem.pinet.com',
	chat: 'chat.pinet.com',
	fireside: 'fireside.pinet.com',
	profiles: 'profiles.pinet.com',
};

const pageRegex =
	/^(?:pi|https):\/\/app-cdn\.minepi\.com\/mobile-app-ui\/(.*?)(?:\?.*|$|\/)|^(?:(?:pi|https):\/\/|)(.*?)\.pinet\.com/;
export const pages: Record<string, string> = {
	home: 'pinet.com',
	wallet: 'wallet.pinet.com',
	feed: 'mine.pinet.com',
	error: 'pi://error.pi',
};

export function transformToPiURL(url: string) {
	const piUrl = url.replace('https://', 'pi://');

	if (appRegex.test(piUrl)) {
		const [, appName, pinetAppName] = appRegex.exec(piUrl) ?? [];

		return appName in apps ? apps[appName] : pinetAppName in apps ? apps[pinetAppName] : piUrl;
	}

	if (pageRegex.test(piUrl)) {
		const [, pageName, pinetAppName] = pageRegex.exec(piUrl) ?? [];

		return pageName in pages ? pages[pageName] : pinetAppName in apps ? apps[pinetAppName] : pages.home;
	}

	if (piUrl.startsWith('pi://blockexplorer.minepi.com/') || piUrl.startsWith('pi://minepi.com/blockexplorer/')) {
		return 'blockexplorer.minepi.com';
	}

	return piUrl;
}
