import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IModeratorUserData } from './IModeratorUserData';

export const ModeratorUserDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IModeratorUserData = {
        userId: wrapper.readInt(),
        userName: wrapper.readString(),
        figure: wrapper.readString(),
        registrationAgeInMinutes: wrapper.readInt(),
        minutesSinceLastLogin: wrapper.readInt(),
        online: wrapper.readBoolean(),
        cfhCount: wrapper.readInt(),
        abusiveCfhCount: wrapper.readInt(),
        cautionCount: wrapper.readInt(),
        banCount: wrapper.readInt(),
        tradingLockCount: wrapper.readInt(),
        tradingExpiryDate: wrapper.readString(),
        lastPurchaseDate: wrapper.readString(),
        identityId: wrapper.readInt(),
        identityRelatedBanCount: wrapper.readInt(),
        primaryEmailAddress: wrapper.readString(),
        userClassification: wrapper.readString(),
        lastSanctionTime: null,
        sanctionAgeHours: 0
    };

    if (wrapper.bytesAvailable)
    {
        packet.lastSanctionTime = wrapper.readString();
        packet.sanctionAgeHours = wrapper.readInt();
    }

    return packet;
}
