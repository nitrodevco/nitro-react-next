import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CallForHelpPendingCallsDeletedMessageType = {
};

export const CallForHelpPendingCallsDeletedMessage: IIncomingPacket<CallForHelpPendingCallsDeletedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CallForHelpPendingCallsDeletedMessageType = {};

    return packet;
};
