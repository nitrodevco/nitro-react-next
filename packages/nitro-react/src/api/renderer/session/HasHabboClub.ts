import { HabboClubLevelEnum } from '@nitrodevco/nitro-packets';
import { SessionStore } from '@nitrodevco/nitro-shared';

export function HasHabboClub(): boolean
{
    return (SessionStore.getState().clubLevel >= HabboClubLevelEnum.Club);
}
