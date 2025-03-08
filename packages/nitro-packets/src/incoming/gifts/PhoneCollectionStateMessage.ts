import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type PhoneCollectionStateMessageType = {
    phoneStatusCode: number;
    collectionStatusCode: number;
    millisecondsToAllowProcessReset: number;
};

export const PhoneCollectionStateMessage: IIncomingPacket<PhoneCollectionStateMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PhoneCollectionStateMessageType = {
        phoneStatusCode: wrapper.readInt(),
        collectionStatusCode: wrapper.readInt(),
        millisecondsToAllowProcessReset: wrapper.readInt()
    };

    return packet;
};
