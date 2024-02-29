import type { MessageType } from './message-type';

interface NavigationChangePayload {
	url: string;
	navigate: boolean;
	action: 'pop' | 'push' | 'replace';
}

interface SuperposeDisplayUrlPayload {
	url: string;
}

type ResponseMessagePayload<T extends MessageType> = T extends MessageType.NAVIGATION_CHANGE
	? NavigationChangePayload
	: T extends MessageType.SUPERPOSE_DISPLAY_URL
		? SuperposeDisplayUrlPayload
		: never;

interface BaseResponseMessage<T extends MessageType> {
	type: T;
	payload: ResponseMessagePayload<T>;
}

export type ResponseMessage =
	| BaseResponseMessage<MessageType.END_SUPERPOSE_DISPLAY_URL>
	| BaseResponseMessage<MessageType.INIT_NAVIGATION>
	| BaseResponseMessage<MessageType.NAVIGATION_CHANGE>
	| BaseResponseMessage<MessageType.PI_APP_CHECK>
	| BaseResponseMessage<MessageType.PI_APP_DETECTED>
	| BaseResponseMessage<MessageType.SUPERPOSE_DISPLAY_URL>
	| BaseResponseMessage<MessageType.UNKNOWN>;
