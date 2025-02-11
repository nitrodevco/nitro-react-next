import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CanCreateRoomMessageParser } from '../../parser';

export class CanCreateRoomEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CanCreateRoomMessageParser);
    }

    public getParser(): CanCreateRoomMessageParser
    {
        return this.parser as CanCreateRoomMessageParser;
    }
}
