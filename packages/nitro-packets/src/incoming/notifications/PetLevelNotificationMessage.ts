import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IPetFigureData, PetFigureDataParser } from '../inventory';

type PetLevelNotificationMessageType = {
    petId: number;
    petName: string;
    level: number;
    figureData: IPetFigureData;
};

export const PetLevelNotificationMessage: IIncomingPacket<PetLevelNotificationMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PetLevelNotificationMessageType = {
        petId: wrapper.readInt(),
        petName: wrapper.readString(),
        level: wrapper.readInt(),
        figureData: PetFigureDataParser(wrapper)
    };

    return packet;
};
