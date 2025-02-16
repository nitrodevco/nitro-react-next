import { IIncomingPacket, IOutgoingPacket } from '#shared/api';
import { NitroLogger } from '#shared/utils';
import { createStore } from 'zustand';

type State = {
    webSocket: WebSocket;
    listeners: Map<IIncomingPacket, Function[]>;
    incomingPackets: Record<number, IIncomingPacket>;
    outgoingPackets: Record<number, IOutgoingPacket>;
}

type Actions = {
    registerIncomingPacket: (header: number, handler: IIncomingPacket) => void;
    registerIncomingPackets: (packets: Record<number, IIncomingPacket>) => void;
    registerOutgoingPacket: (header: number, handler: IOutgoingPacket) => void;
    registerOutgoingPackets: (packets: Record<number, IOutgoingPacket>) => void;
    subscribe: <T>(event: IIncomingPacket<T>, handler: (event: T) => void) => Function;
}

const initialState: State = {
    webSocket: null,
    listeners: new Map(),
    incomingPackets: {},
    outgoingPackets: {}
};

export const CommunicationStore = createStore<State & Actions>(set => ({
    ...initialState,
    registerIncomingPacket: (header: number, handler: IIncomingPacket) => set(state =>
    {
        return {
            incomingPackets: {
                ...state.incomingPackets,
                [header]: handler
            }
        }
    }),
    registerIncomingPackets: (packets: Record<number, IIncomingPacket>) => set(state =>
    {
        return {
            incomingPackets: {
                ...state.incomingPackets,
                ...packets
            }
        };
    }),
    registerOutgoingPacket: (header: number, parser: IOutgoingPacket) => set(state =>
    {
        return {
            outgoingPackets: {
                ...state.outgoingPackets,
                [header]: parser
            }
        }
    }),
    registerOutgoingPackets: (packets: Record<number, IOutgoingPacket>) => set(state =>
    {
        return {
            outgoingPackets: {
                ...state.outgoingPackets,
                ...packets
            }
        };
    }),
    subscribe: <T>(event: IIncomingPacket<T>, handler: (event: T) => void): Function =>
    {
        set(state =>
        {
            const listeners = new Map(state.listeners);

            if (!Object.values(state.incomingPackets).includes(event))
            {
                NitroLogger.error(`Invalid listener, packet ${event.name} has not been registered`);
            }

            listeners.set(event, [...(listeners.get(event) || []), handler])

            return { listeners };
        });

        return () =>
        {
            set(state =>
            {
                const listeners = new Map(state.listeners);

                listeners.set(event, listeners.get(event)?.filter(cb => (cb !== handler)) || []);

                return { listeners };
            });
        }
    }
}));
