import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { RoomUnitTypingParser } from '../../../../parser';

export class RoomUnitTypingEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitTypingParser);
    }

    public getParser(): RoomUnitTypingParser
    {
        return this.parser as RoomUnitTypingParser;
    }
}
