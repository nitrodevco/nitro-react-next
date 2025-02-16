import { IMessageDataWrapper } from '#shared/api';

export type IIncomingPacket<T = unknown> = (wrapper: IMessageDataWrapper) => T;
