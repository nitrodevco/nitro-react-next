import { GetRoomEngine } from '@nitrodevco/nitro-renderer';

export function SetActiveRoomId(roomId: number): void
{
    GetRoomEngine().setActiveRoomId(roomId);
}
