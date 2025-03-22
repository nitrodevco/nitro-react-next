import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { BreedingPetInfoDataParser } from './BreedingPetInfoDataParser';
import { IBreedingPetInfoData } from './IBreedingPetInfoData';
import { IRarityCategoryData } from './IRarityCategoryData';
import { RarityCategoryDataParser } from './RarityCategoryDataParser';

type ConfirmBreedingRequestMessageType = {
    nestId: number;
    petOne: IBreedingPetInfoData;
    petTwo: IBreedingPetInfoData;
    rarityCategories: IRarityCategoryData[];
    resultPetType: number;
};

export const ConfirmBreedingRequestMessage: IIncomingPacket<ConfirmBreedingRequestMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ConfirmBreedingRequestMessageType = {
        nestId: wrapper.readInt(),
        petOne: BreedingPetInfoDataParser(wrapper),
        petTwo: BreedingPetInfoDataParser(wrapper),
        rarityCategories: [],
        resultPetType: -1
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.rarityCategories.push(RarityCategoryDataParser(wrapper));

        count--;
    }

    packet.resultPetType = wrapper.readInt();

    return packet;
};
