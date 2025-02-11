import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { FollowFriendFailedParser } from '../../parser';

export class FollowFriendFailedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FollowFriendFailedParser);
    }

    public getParser(): FollowFriendFailedParser
    {
        return this.parser as FollowFriendFailedParser;
    }
}
