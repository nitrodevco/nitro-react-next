import { ConfigurationStore } from './ConfigurationStore';

export const GetConfigValue = <T>(key: string, defaultValue: T = undefined, config: {} = null) =>
{
    if (!config) config = ConfigurationStore.getState().config;

    if (!key?.length) key = '';

    return key.split('.').reduce((acc, k) => acc?.[k], config) as T ?? defaultValue;
}
