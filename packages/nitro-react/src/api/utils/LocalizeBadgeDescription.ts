import { GetLocalizationManager } from '@nitrodevco/nitro-renderer';

export const LocalizeBadgeDescription = (key: string) =>
{
    let badgeDesc = GetLocalizationManager().getBadgeDesc(key);

    if (!badgeDesc || !badgeDesc.length) badgeDesc = `badge_desc_${key}`;

    return badgeDesc;
};
