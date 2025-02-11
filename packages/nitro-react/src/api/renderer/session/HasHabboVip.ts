import { GetSessionDataManager, HabboClubLevelEnum } from '@nitrodevco/nitro-renderer';

export function HasHabboVip(): boolean
{
    return (GetSessionDataManager().clubLevel >= HabboClubLevelEnum.VIP);
}
