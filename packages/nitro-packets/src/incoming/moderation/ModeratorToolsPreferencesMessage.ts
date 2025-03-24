import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ModeratorToolsPreferencesMessageType = {
    windowsX: number;
    windowY: number;
    windowWidth: number;
    windowHeight: number;
};

export const ModeratorToolsPreferencesMessage: IIncomingPacket<ModeratorToolsPreferencesMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ModeratorToolsPreferencesMessageType = {
        windowsX: wrapper.readInt(),
        windowY: wrapper.readInt(),
        windowWidth: wrapper.readInt(),
        windowHeight: wrapper.readInt()
    };

    return packet;
};
