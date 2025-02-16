import { useCommunicationStore } from '#base/stores';
import { IIncomingPacket } from '@nitrodevco/nitro-shared';
import { useEffect } from 'react';

export const useMessageListener = <T>(
    event: IIncomingPacket<T>,
    handler: (event: T) => void,
    enabled: boolean = true
) =>
{
    const subscribe = useCommunicationStore(state => state.subscribe);

    useEffect(() =>
    {
        if (!enabled) return;

        const unsubscribe = subscribe(event, handler);

        return () => unsubscribe();
    }, [event, handler, enabled, subscribe]);
};
