import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CanCreateRoomEventParser } from '../../parser';

export class CanCreateRoomEventEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CanCreateRoomEventParser);
    }

    public getParser(): CanCreateRoomEventParser
    {
        return this.parser as CanCreateRoomEventParser;
    }
}
