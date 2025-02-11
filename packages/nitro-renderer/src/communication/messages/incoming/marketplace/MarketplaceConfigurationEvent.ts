import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { MarketplaceConfigurationMessageParser } from '../../parser';

export class MarketplaceConfigurationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceConfigurationMessageParser);
    }

    public getParser(): MarketplaceConfigurationMessageParser
    {
        return this.parser as MarketplaceConfigurationMessageParser;
    }
}
