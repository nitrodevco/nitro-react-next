import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CfhSanctionParser } from './CfhSanctionParser';
import { ICfhSanctionData } from './ICfhSanctionData';

type CfhSanctionMessageType = {
    issueId: number;
    accountId: number;
    sanctionType: ICfhSanctionData;
};

export const CfhSanctionMessage: IIncomingPacket<CfhSanctionMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CfhSanctionMessageType = {
        issueId: wrapper.readInt(),
        accountId: wrapper.readInt(),
        sanctionType: CfhSanctionParser(wrapper)
    };

    return packet;
};
