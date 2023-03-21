export function createElement<T>(text: string): T {
	const { body } = new DOMParser().parseFromString(text, 'text/html');
	const elements = [...body.children];

	return (elements.length === 1 ? elements[0] : elements) as unknown as T;
}
