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
		versionNumber: '1.7.1',
		buildNumber: '26',
	},
	nativeSupport: {
		requestPermissions: true,
		inlineMediaPlayback: true,
	},
};

const temporaryConfig = structuredClone(loginConfig);
temporaryConfig.platform.hostApp = 'pi-browser';
temporaryConfig.platform.desktop = false;
temporaryConfig.platform.os = 'android';

export const browserConfig = temporaryConfig;

export function setupConfig(config: typeof loginConfig) {
	localStorage.setItem('@pi:webview_ui_behaviors', JSON.stringify(config));

	window.location.reload();
}
