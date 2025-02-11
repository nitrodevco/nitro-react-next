import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { UserInfoParser } from '../../../parser';

export class UserInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserInfoParser);
    }

    public getParser(): UserInfoParser
    {
        return this.parser as UserInfoParser;
    }
}
