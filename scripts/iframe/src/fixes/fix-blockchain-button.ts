import { MessageType } from '../messages';
import { waitElement } from '../wait-element';

export async function fixBlockchainButton() {
	const appList = await waitElement<HTMLButtonElement>('div[data-testid=app-list]');
	const blockchainButton = appList.children[4];

	blockchainButton.addEventListener('click', () => {
		window.parent.postMessage({
			type: MessageType.NAVIGATION_CHANGE,
			payload: {
				url: 'https://blockexplorer.minepi.com/',
				navigate: true,
			},
		});
	});
}
