import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { RoomPollDataParser } from '../../parser';

export class StartRoomPollEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomPollDataParser);
    }

    public getParser(): RoomPollDataParser
    {
        return this.parser as RoomPollDataParser;
    }
}
