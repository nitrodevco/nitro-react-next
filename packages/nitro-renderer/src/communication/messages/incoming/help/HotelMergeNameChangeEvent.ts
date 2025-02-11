import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { HotelMergeNameChangeParser } from '../../parser';

export class HotelMergeNameChangeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HotelMergeNameChangeParser);
    }

    public getParser(): HotelMergeNameChangeParser
    {
        return this.parser as HotelMergeNameChangeParser;
    }
}
