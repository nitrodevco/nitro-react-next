import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { PurchaseErrorMessageParser } from '../../parser';

export class PurchaseErrorMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PurchaseErrorMessageParser);
    }

    public getParser(): PurchaseErrorMessageParser
    {
        return this.parser as PurchaseErrorMessageParser;
    }
}
