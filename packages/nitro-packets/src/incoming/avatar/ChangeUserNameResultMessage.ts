import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ChangeUserNameResultMessageType = {
    resultCode: number;
    name: string;
    nameSuggestions: string[];
};

export const ChangeUserNameResultMessage: IIncomingPacket<ChangeUserNameResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ChangeUserNameResultMessageType = {
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
