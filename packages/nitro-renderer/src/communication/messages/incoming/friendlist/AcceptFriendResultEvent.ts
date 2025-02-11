import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { AcceptFriendResultParser } from '../../parser';

export class AcceptFriendResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AcceptFriendResultParser);
    }

    public getParser(): AcceptFriendResultParser
    {
        return this.parser as AcceptFriendResultParser;
    }
}
