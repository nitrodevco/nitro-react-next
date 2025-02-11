import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { GiftReceiverNotFoundParser } from '../../parser';

export class GiftReceiverNotFoundEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GiftReceiverNotFoundParser);
    }

    public getParser(): GiftReceiverNotFoundParser
    {
        return this.parser as GiftReceiverNotFoundParser;
    }
}
