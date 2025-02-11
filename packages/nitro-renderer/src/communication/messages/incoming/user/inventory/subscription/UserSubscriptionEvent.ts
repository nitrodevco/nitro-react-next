import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { UserSubscriptionParser } from '../../../../parser';

export class UserSubscriptionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserSubscriptionParser);
    }

    public getParser(): UserSubscriptionParser
    {
        return this.parser as UserSubscriptionParser;
    }
}
