import { INitroOutgoingPacket } from './api';
import { ClientHelloComposer } from './outgoing';
import { OutgoingHeader } from './OutgoingHeader';

export const GetNitroOutgoingMessages = () =>
{
    return {
        [OutgoingHeader.RELEASE_VERSION]: ClientHelloComposer
    } as Record<number, INitroOutgoingPacket>;
}
