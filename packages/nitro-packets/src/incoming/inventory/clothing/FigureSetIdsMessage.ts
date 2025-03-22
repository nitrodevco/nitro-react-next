import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FigureSetIdsMessageType = {
    figureSetIds: number[];
    boundFurnitureNames: string[];
};

export const FigureSetIdsMessage: IIncomingPacket<FigureSetIdsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FigureSetIdsMessageType = {
        figureSetIds: [],
        boundFurnitureNames: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.figureSetIds.push(wrapper.readInt());

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.boundFurnitureNames.push(wrapper.readString());

        count--;
    }

    return packet;
};
