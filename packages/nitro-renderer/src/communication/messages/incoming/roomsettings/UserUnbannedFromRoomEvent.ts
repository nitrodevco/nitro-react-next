import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { UserUnbannedFromRoomParser } from '../../parser';

export class UserUnbannedFromRoomEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserUnbannedFromRoomParser);
    }

    public getParser(): UserUnbannedFromRoomParser
    {
        return this.parser as UserUnbannedFromRoomParser;
    }
}
