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
        doorOpened: false,
        productName: null,
        customImage: null,
        furnitureClassName: null
    };

    packet.doorOpened = wrapper.readBoolean();
    packet.productName = wrapper.readString();
    packet.customImage = wrapper.readString();
    packet.furnitureClassName = wrapper.readString();

    return packet;
};
