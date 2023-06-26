export const loginConfig = {
	platform: {
		desktop: true,
		os: 'win32',
		version: '10.0.0',
		arch: 'x64',
		uuid: '',
		hostApp: 'pi-node',
	},
	bundleData: {
		versionNumber: '1.6.1',
		buildNumber: '21',
	},
	nativeSupport: {
		requestPermissions: true,
		inlineMediaPlayback: true,
	},
};

const temporaryConfig = structuredClone(loginConfig);
temporaryConfig.platform.hostApp = 'pi-browser';

export const browserConfig = temporaryConfig;

export function setupConfig(config: typeof loginConfig) {
	localStorage.setItem('@pi:webview_ui_behaviors', JSON.stringify(config));

	window.location.reload();
}
