import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';

export type INitroIncomingPacket<T = unknown> = (wrapper: IMessageDataWrapper) => T;
