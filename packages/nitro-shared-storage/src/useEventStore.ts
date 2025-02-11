import { useStore as useZustandStore } from 'zustand';
import { EventStore } from './EventStore';

type StoreState = ReturnType<typeof EventStore.getState>;

export const useEventStore = <T>(selector: (state: StoreState) => T): T => useZustandStore(EventStore, selector);
