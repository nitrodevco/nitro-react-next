import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FigureUpdateMessageType = {
    figure: string;
    gender: string;
};

export const FigureUpdateMessage: IIncomingPacket<FigureUpdateMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FigureUpdateMessageType = {
        figure: '',
        gender: ''
    };

    packet.figure = wrapper.readString();
    packet.gender = wrapper.readString();

    return packet;
};
