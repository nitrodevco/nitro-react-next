import { createStore } from 'zustand';

type INitroEvent = {
    type: string;
}

type State = {
    events: Record<string, Function[]>;
}

type Actions = {
    subscribe: <T extends INitroEvent>(eventName: string, handler: (event: T) => void) => Function;
    emit: <T extends INitroEvent>(event: T) => void;
}

const initialState: State = {
    events: {},
};

export const EventStore = createStore<State & Actions>(set => ({
    ...initialState,
    subscribe: <T extends INitroEvent>(eventName: string, handler: (event: T) => void): Function =>
    {
        set(state => ({
            events: {
                ...state.events,
                [eventName]: [...(state.events[eventName] || []), handler]
            }
        }));

        return () =>
        {
            set(state => ({
                events: {
                    ...state.events,
                    [eventName]: state.events[eventName]?.filter(cb => (cb !== handler)) || []
                }
            }));
        }
    },
    emit: <T extends INitroEvent>(event: T) => set(state =>
    {
        state.events[event.type]?.map(cb => cb).forEach(cb => cb(event));

        return {};
    }),
}));
