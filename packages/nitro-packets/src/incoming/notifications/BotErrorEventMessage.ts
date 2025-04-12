import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { BotErrorCodeEnum } from './BotErrorCodeEnum';

type BotErrorEventMessageType = {
    errorCode: BotErrorCodeEnum;
};

export const BotErrorEventMessage: IIncomingPacket<BotErrorEventMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: BotErrorEventMessageType = {
        errorCode: wrapper.readInt() as BotErrorCodeEnum,
    };

    return packet;
};
