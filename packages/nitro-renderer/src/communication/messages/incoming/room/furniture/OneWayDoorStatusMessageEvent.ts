import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { OneWayDoorStatusMessageParser } from '../../../parser';

export class OneWayDoorStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, OneWayDoorStatusMessageParser);
    }

    public getParser(): OneWayDoorStatusMessageParser
    {
        return this.parser as OneWayDoorStatusMessageParser;
    }
}
