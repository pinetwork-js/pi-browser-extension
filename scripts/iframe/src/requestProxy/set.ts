import type { WritableProperties } from '../types';

export function set(request: XMLHttpRequest, property: WritableProperties<XMLHttpRequest>, value: unknown) {
	if (property in request) {
		// @ts-expect-error should work but there is an error with "never" value which makes no sense
		request[property] = value;
	}

	return true;
}
