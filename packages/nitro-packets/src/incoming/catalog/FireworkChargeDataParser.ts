import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FireworkChargeDataParserType = {

};

export const FireworkChargeDataParser: IIncomingPacket<FireworkChargeDataParserType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FireworkChargeDataParserType = {
        fireworkChargeData: null,
    };



    return packet;
};