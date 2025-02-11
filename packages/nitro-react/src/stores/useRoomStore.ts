import { IRoomSession } from '@nitrodevco/nitro-renderer';
import { create } from 'zustand';

interface RoomSlice
{
    roomSession: IRoomSession;
    setRoomSession: (roomSession: IRoomSession) => void;
}

export const useRoomStore = create<RoomSlice>(set => ({
    roomSession: null,
    setRoomSession: (roomSession: IRoomSession) => set({ roomSession })
}));
