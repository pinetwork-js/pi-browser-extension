// ==UserScript==
// @name         Pi Browser
// @namespace    https://github.com/b-derouet/pi-browser
// @version      1.1.1
// @description  Script to recreate the Pi Browser app within a browser on your computer
// @author       B. Derouet (https://github.com/b-derouet)
// @match        https://app-cdn.minepi.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=minepi.com
// @updateURL    https://github.com/b-derouet/pi-browser/raw/main/pi-browser.user.js
// @downloadURL  https://github.com/b-derouet/pi-browser/raw/main/pi-browser.user.js
// @run-at       document-idle
// @noframes
// @unwrap
// @grant        none
// ==/UserScript==
/* eslint-disable unicorn/prefer-top-level-await, sonarjs/cognitive-complexity */
(async () => {
	if (!localStorage.getItem('@pi:webview_ui_behaviors')) {
		const config = {
			platform: { desktop: true, os: 'win32', version: '10.0.0', arch: 'x64', uuid: '', hostApp: 'pi-node' },
			bundleData: { versionNumber: '1.6.1', buildNumber: '21' },
			nativeSupport: { requestPermissions: true, inlineMediaPlayback: true },
		};

		localStorage.setItem('@pi:webview_ui_behaviors', JSON.stringify(config));
		window.location.reload();
	}

	const pageURL = window.location.href;

	if (pageURL === 'https://app-cdn.minepi.com/mobile-app-ui/close.html') {
		window.location.href = 'https://app-cdn.minepi.com/mobile-app-ui/node-signin';
	}

	function createElement(text) {
		const { body } = new DOMParser().parseFromString(text, 'text/html');
		const elements = [...body.children];

		return elements.length === 1 ? elements[0] : elements;
	}

	function realURLtoPiURL(url) {
		if (url.startsWith('https://app-cdn.minepi.com/mobile-app-ui/welcome')) {
			return 'pi://welcome.pi';
		}

		if (url.startsWith('https://app-cdn.minepi.com/mobile-app-ui/chat')) {
			return 'pi://chat.pi';
		}

		if (url.startsWith('https://app-cdn.minepi.com/mobile-app-ui/wallet')) {
			return 'pi://wallet.pi';
		}

		if (
			url.startsWith('https://app-cdn.minepi.com/mobile-app-ui/feed') ||
			url === 'https://app-cdn.minepi.com/mobile-app-ui/'
		) {
			return 'pi://mine.pi';
		}

		if (url.startsWith('https://app-cdn.minepi.com/mobile-app-ui/error')) {
			return 'pi://error.pi';
		}

		if (url.startsWith('https://app-cdn.minepi.com/mobile-app-ui/app/brainstorm')) {
			return 'pi://brainstorm.pi';
		}

		if (url.startsWith('https://app-cdn.minepi.com/mobile-app-ui/app/kyc')) {
			return 'pi://kyc.pi';
		}

		if (url.startsWith('https://app-cdn.minepi.com/mobile-app-ui/app/devportal')) {
			return 'pi://develop.pi';
		}

		if (url.startsWith('https://app-cdn.minepi.com/mobile-app-ui/app/translate')) {
			return 'pi://translate.pi';
		}

		if (url.startsWith('https://app-cdn.minepi.com/mobile-app-ui/app/platform-demo-app')) {
			return 'pi://demo.pi';
		}

		if (url.startsWith('https://app-cdn.minepi.com/mobile-app-ui/app/ecosystem')) {
			return 'pi://testnetecosystem.pi';
		}

		if (url.startsWith('https://minepi.com/blockexplorer')) {
			return 'pi://blockchain.pi';
		}

		return url.replace('https://', 'pi://');
	}

	if (pageURL.startsWith('https://app-cdn.minepi.com/browser')) {
		const main = await new Promise((resolve) => {
			if (document.querySelector('main')) {
				resolve(document.querySelector('main'));

				return;
			}

			const observer = new MutationObserver(() => {
				if (document.querySelector('main')) {
					resolve(document.querySelector('main'));
					observer.disconnect();
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true,
			});
		});

		main.parentElement.children[0].remove();
		main.style.paddingLeft = '0px';

		const temporaryUrl = new URL(pageURL).searchParams.get('url');
		const url = temporaryUrl.replace('pi://', 'https://');
		const appHostname = new URL(url).hostname;
		const userToken = localStorage.getItem('mobile-app-webview-ui_access-token');
		const appRequest = await fetch(`https://socialchain.app/api/mobile_app/resolved_url?q=${appHostname}`, {
			headers: { Authorization: userToken },
		}).catch();
		const appData = await appRequest.json();
		const securedUrl = appData.redirect_url
			? appData.redirect_url.replace('http://', 'https://') + new URL(url).pathname
			: url;
		const iframe = createElement(
			`<iframe src="${securedUrl}" allow="clipboard-read; clipboard-write; camera" style="width: 100vw; height: 100vh; border: none;"></iframe>`,
		);

		const temporaryUrlToShow = securedUrl.startsWith('https://app-cdn.minepi.com/mobile-app-ui/app/')
			? url
			: securedUrl;
		const urlToShow = realURLtoPiURL(temporaryUrlToShow);
		window.history.replaceState({}, '', `/browser?url=${urlToShow}`);

		main.append(iframe);

		iframe.addEventListener('load', (event) => {
			event.currentTarget.contentWindow.postMessage({
				type: '@pi:browser:init_navigation',
			});
		});

		window.addEventListener('message', (event) => {
			if (event.data.type === '@pi:browser:navigation_change') {
				const newUrlToShow = realURLtoPiURL(event.data.payload.url);

				window.history.replaceState({}, '', `/browser?url=${newUrlToShow}`);
			}
		});
	}
})();
