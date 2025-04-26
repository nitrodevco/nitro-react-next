import { HabboClubLevelEnum } from '@nitrodevco/nitro-packets';
import { SessionStore } from '@nitrodevco/nitro-shared';

export function HasHabboVip(): boolean
{
    return (SessionStore.getState().clubLevel >= HabboClubLevelEnum.Vip);
}
