import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { RoomUnitChatParser } from '../../../../parser';

export class RoomUnitChatShoutEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitChatParser);
    }

    public getParser(): RoomUnitChatParser
    {
        return this.parser as RoomUnitChatParser;
    }
}
