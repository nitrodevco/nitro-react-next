import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { HotelClosesAndWillOpenAtMessageParser } from '../../parser';

export class HotelClosesAndWillOpenAtEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HotelClosesAndWillOpenAtMessageParser);
    }

    public getParser(): HotelClosesAndWillOpenAtMessageParser
    {
        return this.parser as HotelClosesAndWillOpenAtMessageParser;
    }
}
