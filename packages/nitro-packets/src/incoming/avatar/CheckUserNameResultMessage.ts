import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CheckUserNameResultMessageType = {
    resultCode: number;
    name: string;
    nameSuggestions: string[];
};

export const CheckUserNameResultMessage: IIncomingPacket<CheckUserNameResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CheckUserNameResultMessageType = {
        resultCode: -1,
        name: '',
        nameSuggestions: []
    };

    packet.resultCode = wrapper.readInt();
    packet.name = wrapper.readString();

    let totalSuggestions = wrapper.readInt();

    while (totalSuggestions > 0)
    {
        packet.nameSuggestions.push(wrapper.readString());

        totalSuggestions--;
    }

    return packet;
};
