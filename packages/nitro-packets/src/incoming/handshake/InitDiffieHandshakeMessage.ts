import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type InitDiffieHandshakeMessageType = {
    encryptedPrime: string;
    encryptedGenerator: string;
};

export const InitDiffieHandshakeMessage: IIncomingPacket<InitDiffieHandshakeMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: InitDiffieHandshakeMessageType = {
        encryptedPrime: wrapper.readString(),
        encryptedGenerator: wrapper.readString()
    };

    return packet;
};
