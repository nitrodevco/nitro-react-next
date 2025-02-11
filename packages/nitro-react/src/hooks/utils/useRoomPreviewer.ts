import { GetRoomPreviewerInstance, RoomPreviewer } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

export const useRoomPreviewer = () =>
{
    const [roomPreviewer, setRoomPreviewer] = useState<RoomPreviewer>(null);

    useEffect(() =>
    {
        if (roomPreviewer) return;

        const roomPreviewerInstance = GetRoomPreviewerInstance();

        setRoomPreviewer(roomPreviewerInstance);

        return () =>
        {
            roomPreviewerInstance.dispose();

            setRoomPreviewer(null);
        }
    }, []);

    return { roomPreviewer };
}
