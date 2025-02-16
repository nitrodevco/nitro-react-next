import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ThumbnailStatusMessageType = {
    ok: boolean;
    renderLimitHit: boolean;
};

export const ThumbnailStatusMessage: IIncomingPacket<ThumbnailStatusMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ThumbnailStatusMessageType = {
        ok: true,
        renderLimitHit: false
    };

    if (wrapper.bytesAvailable)
    {
        packet.ok = wrapper.readBoolean();
        packet.renderLimitHit = wrapper.readBoolean();
    }

    return packet;
};
