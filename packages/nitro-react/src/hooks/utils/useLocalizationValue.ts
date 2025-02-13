import { useLocalization } from './useLocalization';

export const useLocalizationValue = (key: string, parameters: string | string[] = null, replacements: string | string[] = null) =>
{
    const translation = useLocalization();

    return translation(key, parameters, replacements);
}
