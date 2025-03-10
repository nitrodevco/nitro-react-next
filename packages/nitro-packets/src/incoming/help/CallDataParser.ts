import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICallData } from './ICallData';

export const CallDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: ICallData = {
        callId: wrapper.readString(),
        timeStamp: wrapper.readString(),
        message: wrapper.readString()
    };

    return packet;
}
