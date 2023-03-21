export function removeMenu(main: HTMLElement) {
	main.parentElement?.children[0].remove();
	main.style.paddingLeft = '0px';
}
