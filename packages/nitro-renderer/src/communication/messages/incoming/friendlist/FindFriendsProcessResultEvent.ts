import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { FindFriendsProcessResultParser } from '../../parser';

export class FindFriendsProcessResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FindFriendsProcessResultParser);
    }

    public getParser(): FindFriendsProcessResultParser
    {
        return this.parser as FindFriendsProcessResultParser;
    }
}
