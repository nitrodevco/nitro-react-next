import { GetGuestRoomMessageComposer } from '@nitrodevco/nitro-renderer';
import { SendMessageComposer } from '../renderer';

export function TryVisitRoom(roomId: number): void
{
    SendMessageComposer(new GetGuestRoomMessageComposer(roomId, false, true));
}
