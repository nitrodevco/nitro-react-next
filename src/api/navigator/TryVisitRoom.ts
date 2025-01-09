import { GetGuestRoomMessageComposer } from '@nitrots/nitro-renderer';
import { SendMessageComposer } from '../renderer';

export function TryVisitRoom(roomId: number): void
{
    SendMessageComposer(new GetGuestRoomMessageComposer(roomId, false, true));
}
