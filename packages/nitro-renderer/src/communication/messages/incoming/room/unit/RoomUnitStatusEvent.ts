import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { RoomUnitStatusParser } from '../../../parser';

export class RoomUnitStatusEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitStatusParser);
    }

    public getParser(): RoomUnitStatusParser
    {
        return this.parser as RoomUnitStatusParser;
    }
}
