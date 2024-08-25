import { defineConfig } from 'vite';
import Userscript from 'vite-userscript-plugin';
import { author, description, homepage, license, name, version } from './package.json';

export default defineConfig(() => ({
	plugins: [
		Userscript({
			entry: 'src/index.ts',
			header: {
				name: `pi-browser-extension-${name}`,
				description,
				version,
				namespace: 'https://github.com/pinetwork-js/pi-browser-extension',
				homepage,
				author,
				license,
				icon64: 'https://www.google.com/s2/favicons?sz=64&domain=minepi.com',
				match: 'https://app-cdn.minepi.com/*',
				noframes: true,
				unwrap: true,
			},
			server: {
				port: 2000,
			},
		}),
	],
}));
