import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IPetData } from './IPetData';
import { PetDataParser } from './PetDataParser';

type PetReceivedMessageType = {
    boughtAsGift: boolean;
    petData: IPetData;
};

export const PetReceivedMessage: IIncomingPacket<PetReceivedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PetReceivedMessageType = {
        boughtAsGift: wrapper.readBoolean(),
        petData: PetDataParser(wrapper)
    };

    return packet;
};
