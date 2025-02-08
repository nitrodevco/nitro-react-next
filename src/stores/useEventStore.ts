import { INitroEvent } from '@nitrots/nitro-renderer';
import { create } from 'zustand';

type State = {
    events: Record<string, Function[]>;
}

type Actions = {
    subscribe: <T extends INitroEvent>(eventName: string, cb: (event: T) => void) => Function;
    emit: <T extends INitroEvent>(event: T) => void;
}

const initialState: State = {
    events: {},
};

export const useEventStore = create<State & Actions>(set => ({
    ...initialState,
    subscribe: <T extends INitroEvent>(eventName: string, cb: (event: T) => void): Function =>
    {
        set(state => ({
            events: {
                ...state.events,
                [eventName]: [...(state.events[eventName] || []), cb]
            }
        }));

        return () =>
        {
            set(state => ({
                events: {
                    ...state.events,
                    [eventName]: state.events[eventName]?.filter((cb) => cb !== cb) || []
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
