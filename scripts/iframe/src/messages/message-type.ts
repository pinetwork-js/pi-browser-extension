export enum MessageType {
	INIT_NAVIGATION = '@pi:browser:init-navigation',
	NAVIGATION_CHANGE = '@pi:browser:navigation-change',
	PI_APP_CHECK = '@pi:browser:pi-app-check',
	PI_APP_DETECTED = '@pi:browser:pi-app-detected',
	SUPERPOSE_DISPLAY_URL = '@pi:messaging:superposeDisplayUrl',
	END_SUPERPOSE_DISPLAY_URL = '@pi:messaging:endSuperposeDisplayUrl',
	UNKNOWN = 'unknown',
}
