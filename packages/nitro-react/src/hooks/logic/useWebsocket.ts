import { useCommunicationStore, useEventStore } from '#base/stores';
import { GetNitroIncomingMessages } from '@nitrodevco/nitro-packets';
import { NitroEvent } from '@nitrodevco/nitro-renderer';
import { WebSocketEventEnum } from '@nitrodevco/nitro-shared';
import { useEffect } from 'react';
import { useConfigValue } from '../utils';

export const useWebsocket = () =>
{
    const socketUrl = useConfigValue<string>('socket.url');
    const registerIncomingPackets = useCommunicationStore(state => state.registerIncomingPackets);
    const registerOutgoingPackets = useCommunicationStore(state => state.registerOutgoingPackets);
    const emit = useEventStore(state => state.emit);

    useEffect(() =>
    {
        console.log('register packets')
        registerIncomingPackets(GetNitroIncomingMessages());
        registerOutgoingPackets(GetNitroIncomingMessages());
    }, []);

    useEffect(() =>
    {
        if (!socketUrl?.length) return;

        const webSocket = new WebSocket(socketUrl);

        console.log('connection began');

        webSocket.addEventListener('open', () => emit(new NitroEvent(WebSocketEventEnum.OPEN)));

        webSocket.addEventListener('error', error => emit(new NitroEvent(WebSocketEventEnum.ERROR)));

        webSocket.addEventListener('close', () => emit(new NitroEvent(WebSocketEventEnum.CLOSE)));

        webSocket.addEventListener('message', event =>
        {
            console.log('Message from server:', event.data);
        });
    }, [socketUrl]);
}
