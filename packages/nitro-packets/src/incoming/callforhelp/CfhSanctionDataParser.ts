import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICfhSanctionData } from './ICfhSanctionData';

export const CfhSanctionDataParser = (wrapper: IMessageDataWrapper): ICfhSanctionData =>
{
    const packet: ICfhSanctionData = {
        name: wrapper.readString(),
        sanctionLengthInHours: wrapper.readInt(),
        probationDays: wrapper.readInt(),
        avatarOnly: wrapper.readBoolean(),
        tradeLockInfo: '',
        machineBanInfo: ''
    };

    if (wrapper.bytesAvailable) packet.tradeLockInfo = wrapper.readString();

    if (wrapper.bytesAvailable) packet.machineBanInfo = wrapper.readString();

    return packet;
}
