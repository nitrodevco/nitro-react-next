import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GuideOnDutyStatusMessageType = {
    onDuty: boolean;
    guidesOnDuty: number;
    helpersOnDuty: number;
    guardiansOnDuty: number;
};

export const GuideOnDutyStatusMessage: IIncomingPacket<GuideOnDutyStatusMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuideOnDutyStatusMessageType = {
        onDuty: wrapper.readBoolean(),
        guidesOnDuty: wrapper.readInt(),
        helpersOnDuty: wrapper.readInt(),
        guardiansOnDuty: wrapper.readInt()
    };

    return packet;
};
