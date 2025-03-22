import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type UserCreditsMessageType = {
    balance: number;
};

export const UserCreditsMessage: IIncomingPacket<UserCreditsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: UserCreditsMessageType = {
        balance: parseFloat(wrapper.readString())
    };

    return packet;
};
