import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IPetFigureData } from './IPetFigureData';

export const PetFigureDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IPetFigureData = {
        typeId: wrapper.readInt(),
        paletteId: wrapper.readInt(),
        color: wrapper.readString(),
        breedId: wrapper.readInt(),
        customParts: [],
        customPartCount: wrapper.readInt()
    };

    let count = packet.customPartCount;

    while (count > 0)
    {
        packet.customParts.push(wrapper.readInt(), wrapper.readInt(), wrapper.readInt());

        count--;
    }

    return packet;
}
