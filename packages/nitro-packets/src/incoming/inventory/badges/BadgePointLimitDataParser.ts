import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IBadgePointLimitData } from './IBadgePointLimitData';

export const BadgePointLimitDataParser = (type: string, wrapper: IMessageDataWrapper) =>
{
    const packet: IBadgePointLimitData = {
        badgeId: `ACH_${type}${wrapper.readInt()}`,
        limit: wrapper.readInt()
    };

    return packet;
}
