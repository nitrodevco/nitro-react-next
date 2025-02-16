import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CfhCategoryDataParser } from './CfhCategoryDataParser';
import { ICfhCategoryData } from './ICfhCategoryData';

type CfhTopicsInitMessageType = {
    callForHelpCategories: ICfhCategoryData[];
};

export const CfhTopicsInitMessage: IIncomingPacket<CfhTopicsInitMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CfhTopicsInitMessageType = {
        callForHelpCategories: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.callForHelpCategories.push(CfhCategoryDataParser(wrapper));

        count--;
    }

    return packet;
};
