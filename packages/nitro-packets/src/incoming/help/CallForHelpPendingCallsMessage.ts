import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CallDataParser } from './CallDataParser';
import { ICallData } from './ICallData';

type CallForHelpPendingCallsMessageType = {
    calls: ICallData[];
};

export const CallForHelpPendingCallsMessage: IIncomingPacket<CallForHelpPendingCallsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CallForHelpPendingCallsMessageType = {
        calls: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.calls.push(CallDataParser(wrapper));

        count--;
    }

    return packet;
};
