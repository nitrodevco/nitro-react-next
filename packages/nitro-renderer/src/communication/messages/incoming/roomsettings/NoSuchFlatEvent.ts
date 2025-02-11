import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { NoSuchFlatParser } from '../../parser';

export class NoSuchFlatEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NoSuchFlatParser);
    }

    public getParser(): NoSuchFlatParser
    {
        return this.parser as NoSuchFlatParser;
    }
}
