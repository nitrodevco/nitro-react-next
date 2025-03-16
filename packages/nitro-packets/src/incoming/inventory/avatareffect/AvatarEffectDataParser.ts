import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IAvatarEffectData } from './IAvatarEffectData';

export const AvatarEffectDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IAvatarEffectData = {
        type: wrapper.readInt(),
        subType: wrapper.readInt(),
        duration: wrapper.readInt(),
        inactiveEffectsInInventory: wrapper.readInt(),
        secondsLeftIfActive: wrapper.readInt(),
        permanent: wrapper.readBoolean()
    };

    return packet;
}
