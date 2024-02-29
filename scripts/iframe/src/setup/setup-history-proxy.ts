export function setupHistoryProxy() {
	const oldPushState = window.history.pushState.bind(window.history);

	window.history.pushState = function pushState(...arguments_) {
		Reflect.apply(oldPushState, this, arguments_);

		window.dispatchEvent(new Event('locationchange'));
	};

	const oldReplaceState = window.history.replaceState.bind(window.history);

	window.history.replaceState = function replaceState(...arguments_) {
		Reflect.apply(oldReplaceState, this, arguments_);

		window.dispatchEvent(new Event('locationchange'));
	};

	window.addEventListener('popstate', () => {
		window.dispatchEvent(new Event('locationchange'));
	});
}
