import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { UserNameResultCodeEnum } from './UserNameResultCodeEnum';

type CheckUserNameResultMessageType = {
    resultCode: UserNameResultCodeEnum;
    name: string;
    nameSuggestions: string[];
};

export const CheckUserNameResultMessage: IIncomingPacket<CheckUserNameResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CheckUserNameResultMessageType = {
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
