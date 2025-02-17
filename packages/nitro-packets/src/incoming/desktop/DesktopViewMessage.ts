import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type DesktopViewParserType = {

};

export const DesktopViewMessage: IIncomingPacket<DesktopViewParserType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: DesktopViewParserType = {};

    return packet;
};
