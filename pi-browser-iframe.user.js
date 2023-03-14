// ==UserScript==
// @name         Pi Browser - Iframe
// @namespace    https://github.com/b-derouet/pi-browser
// @version      1.0
// @description  Script to configurate Pi apps inside Pi Browser iframe
// @author       B. Derouet (https://github.com/b-derouet)
// @match        https://app-cdn.minepi.com/*
// @match        https://*.piappengine.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=minepi.com
// @updateURL  	 https://github.com/b-derouet/pi-browser/raw/main/pi-browser-iframe.user.js
// @downloadURL  https://github.com/b-derouet/pi-browser/raw/main/pi-browser-iframe.user.js
// @run-at       document-start
// @unwrap
// @grant        none
// ==/UserScript==
/* eslint-disable sonarjs/cognitive-complexity */
(() => {
	if (window.self === window.top) {
		return;
	}

	if (window.parent !== window.top) {
		const userAgentProperty = {
			get: () =>
				'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.153 Mobile Safari/537.36 PiBrowser/1.6.1',
		};
		const vendorProperty = {
			get: () => 'Google Inc.',
		};

		try {
			Object.defineProperty(window.navigator, 'userAgent', userAgentProperty);
			Object.defineProperty(window.navigator, 'vendor', vendorProperty);
		} catch {
			window.navigator = Object.create(navigator, {
				userAgent: userAgentProperty,
				vendor: vendorProperty,
			});
		}

		return;
	}

	window.addEventListener('message', (event) => {
		if (event.data.type === '@pi:browser:init_navigation') {
			const OriginalXHR = window.XMLHttpRequest;

			window.XMLHttpRequest = function XMLHttpRequest() {
				return new Proxy(new OriginalXHR(), {
					open(...arguments_) {
						this.open(...arguments_);
					},

					setRequestHeader(...arguments_) {
						this.setRequestHeader(...arguments_);
					},

					send(body) {
						try {
							const parsedBody = JSON.parse(body);

							if (parsedBody?.name?.startsWith('Navigate to')) {
								window.parent.postMessage({
									type: '@pi:browser:navigation_change',
									payload: {
										url: window.location.href.replace(parsedBody.data.fromRoute, parsedBody.data.toRoute),
									},
								});
							}

							this.send(body);
						} catch {
							this.send(body);
						}
					},

					get(xhr, key) {
						if (!(key in xhr)) {
							return;
						}

						const value = xhr[key];

						if (typeof value === 'function') {
							const method = this[key] ?? value;

							return (...arguments_) => method.apply(xhr, arguments_);
						}

						return value;
					},

					set(xhr, key, value) {
						if (key in xhr) {
							xhr[key] = value;
						}

						return true;
					},
				});
			};
		}
	});
})();
