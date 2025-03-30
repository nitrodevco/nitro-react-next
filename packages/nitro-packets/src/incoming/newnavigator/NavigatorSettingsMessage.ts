import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type NavigatorSettingsMessageType = {
    windowX: number;
    windowY: number;
    windowWidth: number;
    windowHeight: number;
    leftPanelHidden: boolean;
    resultsMode: number;
};

export const NavigatorSettingsMessage: IIncomingPacket<NavigatorSettingsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NavigatorSettingsMessageType = {
        windowX: wrapper.readInt(),
        windowY: wrapper.readInt(),
        windowWidth: wrapper.readInt(),
        windowHeight: wrapper.readInt(),
        leftPanelHidden: wrapper.readBoolean(),
        resultsMode: wrapper.readInt()
    };

    return packet;
};
