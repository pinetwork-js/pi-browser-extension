export function setupConfig() {
	const config = {
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

	localStorage.setItem('@pi:webview_ui_behaviors', JSON.stringify(config));
	window.location.reload();
}
