import { createContext, useEffect, useState } from 'react';

interface INitroConfigContext
{
    config: {};
    getConfigValue: <T>(key: string, defaultValue?: T) => T;
}

export const NitroConfigContext = createContext<INitroConfigContext>(null);

export const NitroConfigProvider = ({ children }) =>
{
    const [ config, setConfig ] = useState<Record<string, any>>(null);

    const processJson = (data: Record<string, any>) =>
    {
        const flattenObject = (obj: {}, parentKey = '', result: Record<string, any> = {}) =>
        {
            if(Array.isArray(obj))
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
            const result: any = {};

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

    const loadConfig = async (url: string, override: Record<string, any> = null) =>
    {
        try
        {
            if(!url || !url.length) throw new Error('invalid_url');

            const response = await fetch(url);

            let data = await response.json() as Record<string, any>;

            if(override) data = { ...data, ...override };

            const processedData = processJson(data);

            setConfig(processedData);
        }
        
        catch (error)
        {
            console.error(`Trouble loading the nitro-config.json using: ${url}`, error.message);
        }
    };

    const getConfigValue = <T = unknown>(key: string, defaultValue: T = undefined): T => key.split('.').reduce((acc, k) => acc?.[k], config as any) ?? defaultValue;

    useEffect(() =>
    {
        if(!window.NitroConfig) throw new Error('NitroConfig is not defined!');
        
        let url = window.NitroConfig['nitro.config.url'];

        if(!url || !url.length) url = './nitro-config.json';

        loadConfig(url, window.NitroConfig);
    }, []);

    if(!config) return null;

    return (
        <NitroConfigContext.Provider value={{ config, getConfigValue }}>
            { children }
        </NitroConfigContext.Provider>
    );
};
