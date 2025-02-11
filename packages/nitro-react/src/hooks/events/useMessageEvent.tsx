import { GetCommunication } from '@nitrodevco/nitro-renderer';
import { useEffect } from 'react';

export const useMessageEvent = <T = unknown>(
    eventType: { new(...args: any[]): T },
    handler: (event: T) => void
) =>
{
    useEffect(() =>
    {
        const event = new eventType(handler);

        GetCommunication().registerMessageEvent(event);

        return () => GetCommunication().removeMessageEvent(event);
    }, [eventType, handler]);
};
