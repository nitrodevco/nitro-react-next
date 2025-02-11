import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { HotelWillShutdownParser } from '../../parser';

export class HotelWillShutdownEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HotelWillShutdownParser);
    }

    public getParser(): HotelWillShutdownParser
    {
        return this.parser as HotelWillShutdownParser;
    }
}
