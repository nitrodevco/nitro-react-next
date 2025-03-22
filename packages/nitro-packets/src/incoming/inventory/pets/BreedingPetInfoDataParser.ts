import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IBreedingPetInfoData } from './IBreedingPetInfoData';

export const BreedingPetInfoDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IBreedingPetInfoData = {
        webId: wrapper.readInt(),
        name: wrapper.readString(),
        level: wrapper.readInt(),
        figure: wrapper.readString(),
        owner: wrapper.readString()
    };

    return packet;
}
