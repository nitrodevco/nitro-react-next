import { GetSessionDataManager, HabboClubLevelEnum } from '@nitrodevco/nitro-renderer';

export function HasHabboClub(): boolean
{
    return (GetSessionDataManager().clubLevel >= HabboClubLevelEnum.CLUB);
}
