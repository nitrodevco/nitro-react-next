import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { MarketplaceMakeOfferResultParser } from '../../parser';


export class MarketplaceMakeOfferResult extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceMakeOfferResultParser);
    }

    public getParser(): MarketplaceMakeOfferResultParser
    {
        return this.parser as MarketplaceMakeOfferResultParser;
    }
}
