import { useLocalizationStore } from '#base/stores';
import { GetRomanNumeral } from '#base/utils';
import { useLocalization } from './useLocalization';

export const useBadgeLocalization = (badgeId: string) =>
{
    const translation = useLocalization();
    const badgePointLimits = useLocalizationStore(state => state.badgePointLimits);

    if (!badgeId?.length) return { name: '', description: '' };

    let length = badgeId.length - 1;

    while (length > 0 && Number(badgeId.charAt(length))) length--;

    const base = badgeId.substring(0, length + 1);
    const levelPart = badgeId.substring(length + 1);
    const level = levelPart ? Math.max(1, parseInt(levelPart)) : 1;

    const getValue = (type: 'name' | 'desc') =>
    {
        const keys = [`badge_${type}_${badgeId}`, `badge_${type}_${base}`];

        let value = '';

        for (const key of keys)
        {
            const item = translation(key);

            if (item != key)
            {
                value = item;

                break;
            }
        }

        value.replace(/\$\{|\{|\}/g, '$');

        if (type === 'desc')
        {
            const limit = (badgePointLimits[badgeId] || -1);

            if (limit > -1) value = value.replace('%limit%', limit.toString());
        }

        value.replace('%roman%', GetRomanNumeral(level));

        return value;
    }

    return {
        name: getValue('name'),
        description: getValue('desc'),
    };
}
