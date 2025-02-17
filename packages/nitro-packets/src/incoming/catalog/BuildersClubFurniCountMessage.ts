import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type BuildersClubFurniCountMessageType = {
    furniCount: number;
};

export const BuildersClubFurniCountMessage: IIncomingPacket<BuildersClubFurniCountMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: BuildersClubFurniCountMessageType = {
        furniCount: wrapper.readInt()
    };

    return packet;
};
