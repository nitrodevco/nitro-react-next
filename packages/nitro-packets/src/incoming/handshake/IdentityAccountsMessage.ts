import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type IdentityAccountsMessageType = {
    accounts: Record<number, string>;
};

export const IdentityAccountsMessage: IIncomingPacket<IdentityAccountsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: IdentityAccountsMessageType = {
        accounts: {}
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.accounts[wrapper.readInt()] = wrapper.readString();

        count--;
    }

    return packet;
};
