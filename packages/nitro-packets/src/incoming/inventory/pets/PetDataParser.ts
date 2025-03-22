import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IPetData } from './IPetData';
import { PetFigureDataParser } from './PetFigureDataParser';

export const PetDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IPetData = {
        id: wrapper.readInt(),
        name: wrapper.readString(),
        figureData: PetFigureDataParser(wrapper),
        level: wrapper.readInt()
    };

    return packet;
}
