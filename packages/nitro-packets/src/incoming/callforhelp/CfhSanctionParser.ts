import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICfhSanctionData } from './ICfhSanctionData';

export const CfhSanctionParser = (wrapper: IMessageDataWrapper): ICfhSanctionData =>
{
    const packet = {} as ICfhSanctionData;

    packet.name = wrapper.readString();
    packet.sanctionLengthInHours = wrapper.readInt();
    packet.probationDays = wrapper.readInt();
    packet.avatarOnly = wrapper.readBoolean();

    if (wrapper.bytesAvailable) packet.tradeLockInfo = wrapper.readString();

    if (wrapper.bytesAvailable) packet.machineBanInfo = wrapper.readString();

    return packet;
}
