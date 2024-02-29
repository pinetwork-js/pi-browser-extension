export function fixGoBackButton() {
	if (window.location.href === 'https://app-cdn.minepi.com/mobile-app-ui/welcome/') {
		window.parent.postMessage({
			type: '@pi:browser:navigation_change',
			payload: {
				url: 'https://app-cdn.minepi.com/mobile-app-ui/welcome/',
			},
		});
	}

	if (window.location.href === 'https://app-cdn.minepi.com/mobile-app-ui/app/ecosystem') {
		window.parent.postMessage({
			type: '@pi:browser:navigation_change',
			payload: {
				url: 'https://app-cdn.minepi.com/mobile-app-ui/app/ecosystem',
			},
		});
	}
}
