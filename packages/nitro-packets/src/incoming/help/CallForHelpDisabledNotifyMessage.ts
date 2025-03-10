import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CallForHelpDisabledNotifyMessageType = {
    infoUrl: string;
};

export const CallForHelpDisabledNotifyMessage: IIncomingPacket<CallForHelpDisabledNotifyMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CallForHelpDisabledNotifyMessageType = {
        infoUrl: wrapper.readString()
    };

    return packet;
};
