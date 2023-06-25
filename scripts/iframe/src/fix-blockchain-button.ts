import { waitElement } from '@zero-dependency/dom';

export async function fixBlockchainButton() {
	const appList = await waitElement<HTMLButtonElement>('div[data-testid=app-list]');
	const blockchainButton = appList.children[4];

	blockchainButton.addEventListener('click', () => {
		window.parent.postMessage({
			type: '@pi:browser:navigation_change',
			payload: {
				url: 'https://blockexplorer.minepi.com/',
				navigate: true,
			},
		});
	});
}
