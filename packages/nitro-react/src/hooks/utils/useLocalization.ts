import { useLocalizationStore } from '#base/stores';
import { useConfig } from './useConfig';

export const useLocalization = () =>
{
    const localization = useLocalizationStore(state => state.localization);
    const config = useConfig();

    return (key: string, parameters: string | string[] = null, replacements: string | string[] = null) =>
    {
        let value = localization[key];

        if (!value) value = config(value);

        if (!value) value = key;
        else value = value.toString();

        if (replacements)
        {
            if (!Array.isArray(replacements)) replacements = [replacements];
        }

        if (parameters)
        {
            if (!Array.isArray(parameters)) parameters = [parameters];

            for (let i = 0; i < parameters.length; i++)
            {
                const parameter = parameters[i];
                const replacement = replacements[i];

                if (replacement === undefined) continue;

                // Replace direct placeholders like %PARAM%
                value = value.replace(`%${parameter}%`, replacement);

                // Check for complex placeholders like %{PARAM|option1|option2|option3}
                if (value.startsWith('%{'))
                {
                    const regex = new RegExp(`%{${parameter.toUpperCase()}\\|([^|]*)\\|([^|]*)\\|([^|]*)}`);
                    const match = value.match(regex);

                    if (!match) continue;

                    const replacementAsNumber = parseInt(replacement);
                    let selectedIndex = -1;

                    switch (replacementAsNumber)
                    {
                        case 0:
                            selectedIndex = 1;
                            break;
                        case 1:
                            selectedIndex = 2;
                            break;
                        case 2:
                        default:
                            selectedIndex = 3;
                            break;
                    }

                    if (selectedIndex === -1 || !match[selectedIndex]) continue;

                    // Replace the entire placeholder with the selected value
                    value = match[selectedIndex].replace('%%', replacement);
                }
            }
        }

        return value;
    }
}
