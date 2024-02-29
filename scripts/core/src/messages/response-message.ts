import type { MessageType } from './message-type';

interface NavigationChangePayload {
	url: string;
	navigate: boolean;
	action: 'pop' | 'push' | 'replace';
}

type ResponseMessagePayload<T extends MessageType> = T extends MessageType.NAVIGATION_CHANGE
	? NavigationChangePayload
	: never;

interface BaseResponseMessage<T extends MessageType> {
	type: T;
	payload: ResponseMessagePayload<T>;
}

export type ResponseMessage =
	| BaseResponseMessage<MessageType.NAVIGATION_CHANGE>
	| BaseResponseMessage<MessageType.UNKNOWN>;
