import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { AvailabilityStatusMessageParser } from '../../parser';

export class AvailabilityStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AvailabilityStatusMessageParser);
    }

    public getParser(): AvailabilityStatusMessageParser
    {
        return this.parser as AvailabilityStatusMessageParser;
    }
}
