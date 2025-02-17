import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type BuildersClubSubscriptionStatusMessageType = {
    secondsLeft: number;
    furniLimit: number;
    maxFurniLimit: number;
    secondsLeftWithGrace: number;
};

export const BuildersClubSubscriptionStatusMessage: IIncomingPacket<BuildersClubSubscriptionStatusMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: BuildersClubSubscriptionStatusMessageType = {
        secondsLeft: wrapper.readInt(),
        furniLimit: wrapper.readInt(),
        maxFurniLimit: wrapper.readInt(),
        secondsLeftWithGrace: 0
    };

    if (wrapper.bytesAvailable) packet.secondsLeftWithGrace = wrapper.readInt();
    else packet.secondsLeftWithGrace = packet.secondsLeft;

    return packet;
};
