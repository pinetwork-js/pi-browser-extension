export const appRegex = /^(?:pi|https):\/\/app-cdn\.minepi\.com\/mobile-app-ui\/app\/(.*?)(?:$|\/)/;
const apps: Record<string, string> = {
	brainstorm: 'pi://brainstorm.pi',
	kyc: 'pi://kyc.pi',
	devportal: 'pi://develop.pi',
	translate: 'pi://translate.pi',
	'platform-demo-app': 'pi://demo.pi',
	ecosystem: 'pi://testnetecosystem.pi',
	chat: 'pi://chat.pi',
	fireside: 'pi://fireside.pinet.com',
};

const pageRegex = /^(?:pi|https):\/\/app-cdn\.minepi\.com\/mobile-app-ui\/(.*?)(?:\?.*|$|\/)/;
export const pages: Record<string, string> = {
	welcome: 'pi://welcome.pi',
	chat: 'pi://_LEGACY_chat.pi',
	wallet: 'pi://wallet.pi',
	feed: 'pi://mine.pi',
	error: 'pi://error.pi',
};

export function transformToPiURL(url: string) {
	const piUrl = url.replace('https://', 'pi://');

	if (appRegex.test(piUrl)) {
		const [, appName] = appRegex.exec(piUrl) ?? [];

		return appName in apps ? apps[appName] : piUrl;
	}

	if (pageRegex.test(piUrl)) {
		const [, pageName] = pageRegex.exec(piUrl) ?? [];

		return pageName in pages ? pages[pageName] : pages.feed;
	}

	if (piUrl.startsWith('pi://blockexplorer.minepi.com/') || piUrl.startsWith('pi://minepi.com/blockexplorer/')) {
		return 'pi://blockchain.pi';
	}

	return piUrl;
}
