import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { BadgePointLimitDataParser } from './BadgePointLimitDataParser';
import { IBadgePointLimitData } from './IBadgePointLimitData';

type BadgePointLimitsMessageType = {
    data: IBadgePointLimitData[];
};

export const BadgePointLimitsMessage: IIncomingPacket<BadgePointLimitsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: BadgePointLimitsMessageType = {
        data: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        const type = wrapper.readString();

        let typeCount = wrapper.readInt();

        while (count > 0)
        {
            packet.data.push(BadgePointLimitDataParser(type, wrapper));

            typeCount--;
        }

        count--;
    }

    return packet;
};
