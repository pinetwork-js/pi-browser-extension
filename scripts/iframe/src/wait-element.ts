function observeElement<T extends Element = Element>(
	element: T,
	callback: (mutation: MutationRecord, observer: MutationObserver) => void,
	options?: MutationObserverInit,
): () => void {
	const observe = new MutationObserver((mutations, observer) => {
		for (const mutation of mutations) {
			callback(mutation, observer);
		}
	});

	observe.observe(element, {
		childList: true,
		subtree: true,
		...options,
	});

	return () => observe.disconnect();
}

export function waitElement<T extends Element = Element>(
	selector: string,
	target = document.documentElement,
): Promise<T> {
	return new Promise((resolve) => {
		observeElement(target, (_, observer) => {
			const element = target.querySelector<T>(selector);

			if (element) {
				observer.disconnect();
				resolve(element);
			}
		});
	});
}
