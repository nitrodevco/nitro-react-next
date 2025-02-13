import { useLocalizationStore } from '#base/stores';
import { BadgePointLimitsEvent } from '@nitrodevco/nitro-renderer';
import { useEffect } from 'react';
import { useMessageEvent } from '../events';
import { useConfigValue } from '../utils';

export const useLocalizationLoader = () =>
{
    const setLocalization = useLocalizationStore(state => state.setLocalization);
    const setBadgePointLimits = useLocalizationStore(state => state.setBadgePointLimits);
    const localizationNeedsUpdate = useLocalizationStore(state => state.localizationNeedsUpdate);
    const localizationUrl = useConfigValue<string | string[]>('gamedata.urls.externalTexts');

    const processJson = (data: Record<string, string>) =>
    {
        const flattenObject = (obj: {}, parentKey = '', result: Record<string, any> = {}) =>
        {
            if (Array.isArray(obj))
            {
                obj.forEach((item, index) => flattenObject(item, `${parentKey}[${index}]`, result));
            }

            else if (typeof obj === "object" && obj !== null)
            {
                for (const key in obj)
                {
                    if (obj.hasOwnProperty(key))
                    {
                        const newKey = parentKey ? `${parentKey}.${key}` : key;

                        flattenObject(obj[key], newKey, result);
                    }
                }
            }

            else result[parentKey] = obj;

            return result;
        }

        const resolveReferences = (flatConfig: Record<string, any>) =>
        {
            const resolvedConfig = { ...flatConfig };

            const getValue = (key: string) => resolvedConfig[key] ?? `\${${key}}`;

            for (const key in resolvedConfig)
            {
                if (typeof resolvedConfig[key] === "string") resolvedConfig[key] = resolvedConfig[key].replace(/\$\{([^}]+)\}/g, (_, refKey) => getValue(refKey));
            }

            return resolvedConfig;
        }

        const unflattenObject = (flatConfig: Record<string, any>) =>
        {
            const result = {};

            for (const key in flatConfig)
            {
                const keys = key.split(/\.|\[|\]/).filter(Boolean);

                let current = result;

                for (let i = 0; i < keys.length - 1; i++)
                {
                    const isNextKeyNumeric = !isNaN(Number(keys[i + 1]));
                    const currentKey = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);

                    if (!(currentKey in current)) current[currentKey] = isNextKeyNumeric ? [] : {};

                    current = current[currentKey];
                }

                const lastKey = isNaN(Number(keys[keys.length - 1])) ? keys[keys.length - 1] : Number(keys[keys.length - 1]);

                current[lastKey] = flatConfig[key];
            }

            return result;
        }

        const flatten = flattenObject(data);
        const resolvedReferences = resolveReferences(flatten);
        const unflatten = unflattenObject(resolvedReferences);

        return unflatten;
    }

    useMessageEvent<BadgePointLimitsEvent>(BadgePointLimitsEvent, event =>
    {
        const parser = event.getParser();

        const data: Record<string, number> = {};

        for (const data of parser.data)
        {
            data[data.badgeId] = data.limit;
        }

        setBadgePointLimits(data);
    });

    useEffect(() =>
    {
        if (!localizationNeedsUpdate) return;

        let urls: string[] = [];

        if (Array.isArray(localizationUrl))
        {
            localizationUrl.forEach((url: string) => urls.push(url));
        }
        else
        {
            urls.push(localizationUrl);
        }

        const load = async (urls: string[]) =>
        {
            let data: Record<string, any> = {};

            for (const url of urls)
            {
                try
                {
                    const response = await fetch(url);
                    const responseData = await response.json() as Record<string, any>;

                    data = { ...data, ...responseData };
                }

                catch (err)
                {
                    console.error(`Trouble loading the localization using: ${url}`, err.message);
                }
            }

            setLocalization(processJson({ ...data }));
        }

        load(urls);
    }, [localizationNeedsUpdate]);
}
