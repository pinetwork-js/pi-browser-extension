// ==UserScript==
// @name         Pi Browser - Iframe
// @namespace    https://github.com/b-derouet/pi-browser
// @version      1.0
// @description  Script to configurate Pi apps inside Pi Browser iframe
// @author       B. Derouet (https://github.com/b-derouet)
// @match        https://app-cdn.minepi.com/*
// @match        https://*.piappengine.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=minepi.com
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
						} finally {
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

						return value;
					},
				});
			};
		}
	});
})();
