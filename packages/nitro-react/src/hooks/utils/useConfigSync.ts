import { useConfigurationStore } from '#base/stores';
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { NitroLogger } from '@nitrodevco/nitro-shared';
import { useEffect } from 'react';

export const useConfigSync = () =>
{
    const config = useConfigurationStore(state => state.config);

    useEffect(() =>
    {
        if (!config) return;

        const getConfigValue = <T>(key: string, defaultValue: T = undefined) => key.split('.').reduce((acc, k) => acc?.[k], config) as T ?? defaultValue;

        GetTicker().maxFPS = getConfigValue<number>('renderer.fps', 24);

        NitroLogger.LOG_DEBUG = getConfigValue<boolean>('logging.debug', false);
        NitroLogger.LOG_WARN = getConfigValue<boolean>('logging.warn', false);
        NitroLogger.LOG_ERROR = getConfigValue<boolean>('logging.error', false);
        NitroLogger.LOG_EVENTS = getConfigValue<boolean>('logging.events', false);
        NitroLogger.LOG_PACKETS = getConfigValue<boolean>('logging.packets', false);
    }, [config]);
}
