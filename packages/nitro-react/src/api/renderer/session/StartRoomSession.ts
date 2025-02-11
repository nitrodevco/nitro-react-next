import { GetRoomSessionManager, IRoomSession } from '@nitrodevco/nitro-renderer';

export function StartRoomSession(session: IRoomSession): void
{
    GetRoomSessionManager().startSession(session);
}
