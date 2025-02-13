import { useConfigurationStore } from '#base/stores';
import { useEffect, useState } from 'react';
import { useConfigSync } from '../utils';

export const useConfigLoader = () =>
{
    const [isConfigReady, setConfigReady] = useState(false);
    const setConfig = useConfigurationStore(state => state.setConfig);
    const configNeedsUpdate = useConfigurationStore(state => state.configNeedsUpdate);

    const processJson = (data: Record<string, any>) =>
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

    useEffect(() =>
    {
        if (!window.NitroConfig) throw new Error('NitroConfig is not defined!');

        let urls: string[] = [];

        if (Array.isArray(window.NitroConfig['nitro.config.url']))
        {
            window.NitroConfig['nitro.config.url'].forEach((url: string) => urls.push(url));
        }
        else
        {
            urls.push(window.NitroConfig['nitro.config.url']);
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
                    console.error(`Trouble loading the configuration using: ${url}`, err.message);
                }
            }

            const dataToProcess = { ...data, ...window.NitroConfig };
            const urlParams = new URLSearchParams(window.location.search);

            if (urlParams.size > 0) urlParams.forEach((value, key) => dataToProcess[key] = value);

            setConfig(processJson(dataToProcess));
            setConfigReady(true);
        }

        load(urls);
    }, [configNeedsUpdate]);

    useConfigSync();

    return { isConfigReady };
}
