import { GetRoomSessionManager } from '@nitrodevco/nitro-renderer';

export function CreateRoomSession(roomId: number, password: string = null): void
{
    GetRoomSessionManager().createSession(roomId, password);
}
