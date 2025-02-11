import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { FriendNotificationParser } from '../../parser';

export class FriendNotificationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FriendNotificationParser);
    }

    public getParser(): FriendNotificationParser
    {
        return this.parser as FriendNotificationParser;
    }
}
