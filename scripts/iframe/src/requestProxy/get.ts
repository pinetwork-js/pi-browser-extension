export function get(this: XMLHttpRequest, request: XMLHttpRequest, property: keyof XMLHttpRequest) {
	if (!(property in request)) {
		return;
	}

	const value = request[property];

	if (typeof value === 'function') {
		const method = this[property] ?? value;

		return (...arguments_: Parameters<typeof method>) => method.apply(request, arguments_);
	}

	return value;
}
