import { GetCommunication, IMessageComposer } from '@nitrodevco/nitro-renderer';

export const SendMessageComposer = (event: IMessageComposer<unknown[]>) => GetCommunication().connection.send(event);
