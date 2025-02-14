import { EventStore } from '@nitrodevco/nitro-shared';
import { useStore as useZustandStore } from 'zustand';

type StoreState = ReturnType<typeof EventStore.getState>;

export const useEventStore = <T>(selector: (state: StoreState) => T): T => useZustandStore(EventStore, selector);
