import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { MarketplaceItemStatsParser } from '../../parser';

export class MarketplaceItemStatsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceItemStatsParser);
    }

    public getParser(): MarketplaceItemStatsParser
    {
        return this.parser as MarketplaceItemStatsParser;
    }
}
