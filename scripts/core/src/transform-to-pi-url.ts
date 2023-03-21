export const appRegex = /^(?:pi|https?):\/\/app-cdn\.minepi\.com\/mobile-app-ui\/app\/(.*?)(?:$|\/)/;
const apps: Record<string, string> = {
	brainstorm: 'pi://brainstorm.pi',
	kyc: 'pi://kyc.pi',
	devportal: 'pi://develop.pi',
	translate: 'pi://translate.pi',
	'platform-demo-app': 'pi://demo.pi',
	ecosystem: 'pi://testnetecosystem.pi',
};

const pageRegex = /^(?:pi|https?):\/\/app-cdn\.minepi\.com\/mobile-app-ui\/(.*?)(?:$|\/)/;
export const pages: Record<string, string> = {
	welcome: 'pi://welcome.pi',
	chat: 'pi://chat.pi',
	wallet: 'pi://wallet.pi',
	feed: 'pi://mine.pi',
	'': 'pi://mine.pi',
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

		return pageName in pages ? pages[pageName] : piUrl;
	}

	if (piUrl.startsWith('https://minepi.com/blockexplorer')) {
		return 'pi://blockchain.pi';
	}

	return piUrl;
}
