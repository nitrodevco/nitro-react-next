import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { RoomUnitNumberParser } from '../../../parser';

export class RoomUnitNumberEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitNumberParser);
    }

    public getParser(): RoomUnitNumberParser
    {
        return this.parser as RoomUnitNumberParser;
    }
}
