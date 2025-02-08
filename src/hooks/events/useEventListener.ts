import { useEventStore } from '#base/stores';
import { INitroEvent } from '@nitrots/nitro-renderer';
import { useEffect } from 'react';

export const useEventListener = <T extends INitroEvent>(events: Record<string, (event: T) => void>) =>
{
    const subscribe = useEventStore(state => state.subscribe);

    useEffect(() =>
    {
        const unsubscribers = Object.entries(events).map(([eventName, handler]) => subscribe(eventName, handler));

        return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
    }, [subscribe, events]);
};
