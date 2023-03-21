import { proxy } from './requestProxy';

export function setupNavigationUpdate() {
	window.addEventListener('message', (event) => {
		if (event.data.type === '@pi:browser:init_navigation') {
			const OriginalXHR = window.XMLHttpRequest;

			window.XMLHttpRequest = function XMLHttpRequest() {
				return new Proxy(new OriginalXHR(), proxy);
			} as unknown as typeof OriginalXHR;
		}
	});
}
