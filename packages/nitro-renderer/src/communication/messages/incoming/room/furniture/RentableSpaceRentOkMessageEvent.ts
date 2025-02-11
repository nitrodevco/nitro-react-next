import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { RentableSpaceRentOkMessageParser } from '../../../parser';

export class RentableSpaceRentOkMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RentableSpaceRentOkMessageParser);
    }

    public getParser(): RentableSpaceRentOkMessageParser
    {
        return this.parser as RentableSpaceRentOkMessageParser;
    }
}
