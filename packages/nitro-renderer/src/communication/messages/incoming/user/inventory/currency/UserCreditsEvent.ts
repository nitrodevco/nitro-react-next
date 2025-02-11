import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { UserCreditsParser } from '../../../../parser';

export class UserCreditsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserCreditsParser);
    }

    public getParser(): UserCreditsParser
    {
        return this.parser as UserCreditsParser;
    }
}
