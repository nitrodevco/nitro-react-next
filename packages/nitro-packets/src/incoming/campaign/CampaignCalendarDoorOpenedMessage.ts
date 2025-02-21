import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CampaignCalendarDoorOpenedMessageType = {
    doorOpened: boolean;
    productName: string;
    customImage: string;
    furnitureClassName: string;
};

export const CampaignCalendarDoorOpenedMessage: IIncomingPacket<CampaignCalendarDoorOpenedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CampaignCalendarDoorOpenedMessageType = {
        doorOpened: wrapper.readBoolean(),
        productName: wrapper.readString(),
        customImage: wrapper.readString(),
        furnitureClassName: wrapper.readString()
    };

    return packet;
};
