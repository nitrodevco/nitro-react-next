import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CompleteDiffieHandshakeMessageType = {
    encryptedPublicKey: string;
    serverClientEncryption: boolean;
};

export const CompleteDiffieHandshakeMessage: IIncomingPacket<CompleteDiffieHandshakeMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CompleteDiffieHandshakeMessageType = {
        encryptedPublicKey: wrapper.readString(),
        serverClientEncryption: null
    };

    if (wrapper.bytesAvailable) packet.serverClientEncryption = wrapper.readBoolean();

    return packet;
};
