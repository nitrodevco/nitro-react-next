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
        issueId: -1,
        accountId: 1,
        sanctionType: null
    };

    packet.issueId = wrapper.readInt();
    packet.accountId = wrapper.readInt();
    packet.sanctionType = CfhSanctionParser(wrapper);

    return packet;
};
