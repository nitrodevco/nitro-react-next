import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { RentableSpaceRentFailedMessageParser } from '../../../parser';

export class RentableSpaceRentFailedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RentableSpaceRentFailedMessageParser);
    }

    public getParser(): RentableSpaceRentFailedMessageParser
    {
        return this.parser as RentableSpaceRentFailedMessageParser;
    }
}
