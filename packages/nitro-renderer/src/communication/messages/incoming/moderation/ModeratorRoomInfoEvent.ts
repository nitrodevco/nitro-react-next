import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ModeratorRoomInfoMessageParser } from '../../parser';

export class ModeratorRoomInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModeratorRoomInfoMessageParser);
    }

    public getParser(): ModeratorRoomInfoMessageParser
    {
        return this.parser as ModeratorRoomInfoMessageParser;
    }
}
