import { script } from './script';

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => script(), {
		once: true,
	});
} else {
	script();
}
