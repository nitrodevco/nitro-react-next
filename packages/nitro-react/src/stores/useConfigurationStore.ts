import { ConfigurationStore } from '@nitrodevco/nitro-shared-storage';
import { useStore as useZustandStore } from 'zustand';

type StoreState = ReturnType<typeof ConfigurationStore.getState>;

export const useConfigurationStore = <T>(selector: (state: StoreState) => T): T => useZustandStore(ConfigurationStore, selector);
