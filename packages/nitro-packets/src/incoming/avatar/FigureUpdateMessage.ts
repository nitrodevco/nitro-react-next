import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FigureUpdateMessageType = {
    figure: string;
    gender: string;
};

export const FigureUpdateMessage: IIncomingPacket<FigureUpdateMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FigureUpdateMessageType = {
        figure: wrapper.readString(),
        gender: wrapper.readString()
    };

    return packet;
};
