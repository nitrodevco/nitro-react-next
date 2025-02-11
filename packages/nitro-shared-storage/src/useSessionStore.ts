import { useStore as useZustandStore } from 'zustand';
import { SessionStore } from './SessionStore';

type StoreState = ReturnType<typeof SessionStore.getState>;

export const useSessionStore = <T>(selector: (state: StoreState) => T): T => useZustandStore(SessionStore, selector);
