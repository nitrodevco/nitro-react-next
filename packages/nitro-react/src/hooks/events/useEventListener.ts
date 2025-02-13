import { useEventStore } from '#base/stores';
import { INitroEvent } from '@nitrodevco/nitro-renderer';
import { useEffect } from 'react';

export const useEventListener = <T extends INitroEvent>(
    eventName: string | string[],
    eventHandler: (event: T) => void,
    enabled: boolean = true
) =>
{
    const subscribe = useEventStore(state => state.subscribe);

    useEffect(() =>
    {
        if (!enabled) return;

        const unsubscribers: Function[] = [...eventName].map(eventName => subscribe(eventName, eventHandler));

        if (!unsubscribers.length) return;

        return () => unsubscribers.forEach(unsubscribe => unsubscribe());
    }, [eventName, eventHandler, enabled, subscribe]);
};
