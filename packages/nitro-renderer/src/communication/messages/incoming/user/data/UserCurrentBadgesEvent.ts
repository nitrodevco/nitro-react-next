import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { UserCurrentBadgesParser } from '../../../parser';

export class UserCurrentBadgesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserCurrentBadgesParser);
    }

    public getParser(): UserCurrentBadgesParser
    {
        return this.parser as UserCurrentBadgesParser;
    }
}
