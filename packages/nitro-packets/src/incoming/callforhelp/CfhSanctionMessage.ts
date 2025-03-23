import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CfhSanctionDataParser } from './CfhSanctionDataParser';
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
        sanctionType: CfhSanctionDataParser(wrapper)
    };

    return packet;
};
