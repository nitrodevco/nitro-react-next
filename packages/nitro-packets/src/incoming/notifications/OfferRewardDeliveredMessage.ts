import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type OfferRewardDeliveredMessageType = {
    contentType: string;
    classId: number;
    name: string;
    description: string;
};

export const OfferRewardDeliveredMessage: IIncomingPacket<OfferRewardDeliveredMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: OfferRewardDeliveredMessageType = {
        contentType: wrapper.readString(),
        classId: wrapper.readInt(),
        name: wrapper.readString(),
        description: wrapper.readString()
    };

    return packet;
};
