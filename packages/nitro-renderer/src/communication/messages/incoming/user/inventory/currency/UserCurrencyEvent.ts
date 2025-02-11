import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { UserCurrencyParser } from '../../../../parser';

export class UserCurrencyEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserCurrencyParser);
    }

    public getParser(): UserCurrencyParser
    {
        return this.parser as UserCurrencyParser;
    }
}
