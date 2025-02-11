import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { FavoriteMembershipUpdateMessageParser } from '../../../parser';

export class FavoriteMembershipUpdateMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FavoriteMembershipUpdateMessageParser);
    }

    public getParser(): FavoriteMembershipUpdateMessageParser
    {
        return this.parser as FavoriteMembershipUpdateMessageParser;
    }
}
