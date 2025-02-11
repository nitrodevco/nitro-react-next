import { useStore as useZustandStore } from 'zustand';
import { ConfigurationStore } from './ConfigurationStore';

type StoreState = ReturnType<typeof ConfigurationStore.getState>;

export const useConfigurationStore = <T>(selector: (state: StoreState) => T): T => useZustandStore(ConfigurationStore, selector);
