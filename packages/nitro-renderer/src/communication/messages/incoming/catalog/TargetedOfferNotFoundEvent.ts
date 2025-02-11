import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { TargetedOfferNotFoundParser } from '../../parser';

export class TargetedOfferNotFoundEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TargetedOfferNotFoundParser);
    }

    public getParser(): TargetedOfferNotFoundParser
    {
        return this.parser as TargetedOfferNotFoundParser;
    }
}
