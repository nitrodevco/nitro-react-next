import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { UserWardrobePageParser } from '../../../parser';

export class UserWardrobePageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserWardrobePageParser);
    }

    public getParser(): UserWardrobePageParser
    {
        return this.parser as UserWardrobePageParser;
    }
}
