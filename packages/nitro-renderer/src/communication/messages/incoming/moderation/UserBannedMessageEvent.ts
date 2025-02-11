import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { UserBannedMessageParser } from '../../parser';

export class UserBannedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserBannedMessageParser);
    }

    public getParser(): UserBannedMessageParser
    {
        return this.parser as UserBannedMessageParser;
    }
}
