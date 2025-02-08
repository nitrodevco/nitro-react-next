import { useConfigurationStore } from '#base/stores';

export const useConfigValue = <T>(key: string, defaultValue: T = undefined) =>
{
    const config = useConfigurationStore(state => state.config);

    return key.split('.').reduce((acc, k) => acc?.[k], config) as T ?? defaultValue;
}
