import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { UserNameResultCodeEnum } from './UserNameResultCodeEnum';

type ChangeUserNameResultMessageType = {
    resultCode: UserNameResultCodeEnum;
    name: string;
    nameSuggestions: string[];
};

export const ChangeUserNameResultMessage: IIncomingPacket<ChangeUserNameResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ChangeUserNameResultMessageType = {
        resultCode: wrapper.readInt(),
        name: wrapper.readString(),
        nameSuggestions: []
    };

    let totalSuggestions = wrapper.readInt();

    while (totalSuggestions > 0)
    {
        packet.nameSuggestions.push(wrapper.readString());

        totalSuggestions--;
    }

    return packet;
};
