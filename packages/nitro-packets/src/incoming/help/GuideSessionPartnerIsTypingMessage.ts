import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GuideSessionPartnerIsTypingMessageType = {
    isTyping: boolean;
};

export const GuideSessionPartnerIsTypingMessage: IIncomingPacket<GuideSessionPartnerIsTypingMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuideSessionPartnerIsTypingMessageType = {
        isTyping: wrapper.readBoolean()
    };

    return packet;
};
