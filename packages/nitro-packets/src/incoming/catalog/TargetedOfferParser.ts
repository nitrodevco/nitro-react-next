import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type TargetedOfferParserType = {

};

export const TargetedOfferParser: IIncomingPacket<TargetedOfferParserType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TargetedOfferParserType = {
        data: null,
    };



    return packet;
};