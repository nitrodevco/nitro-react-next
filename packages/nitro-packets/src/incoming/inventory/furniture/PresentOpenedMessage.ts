import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type PresentOpenedMessageType = {
    itemType: string;
    classId: number;
    productCode: string;
    placedItemId: number;
    placedItemType: string;
    placedInRoom: boolean;
    petFigureString: string;
};

export const PresentOpenedMessage: IIncomingPacket<PresentOpenedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PresentOpenedMessageType = {
        itemType: wrapper.readString(),
        classId: wrapper.readInt(),
        productCode: wrapper.readString(),
        placedItemId: wrapper.readInt(),
        placedItemType: wrapper.readString(),
        placedInRoom: wrapper.readBoolean(),
        petFigureString: wrapper.readString()
    };

    return packet;
};
