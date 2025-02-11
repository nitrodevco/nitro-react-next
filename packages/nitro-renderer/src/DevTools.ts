import { GetRoomEngine, RoomEngine } from '#renderer/room';
export { };

declare global
{
	interface Window
	{
		NitroDevTools?:
		{
			roomEngine: RoomEngine;
		};
	}
}

window.NitroDevTools = {
	roomEngine: GetRoomEngine()
};
