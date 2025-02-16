import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FigureUpdateParserType = {
    figure: string;
    gender: string;
};

export const FigureUpdateParser: IIncomingPacket<FigureUpdateParserType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FigureUpdateParserType = {
        figure: '',
        gender: ''
    };

    packet.figure = wrapper.readString();
    packet.gender = wrapper.readString();

    return packet;
};
